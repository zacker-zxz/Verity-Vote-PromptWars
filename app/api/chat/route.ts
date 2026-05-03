/**
<<<<<<< HEAD
 * @fileoverview POST /api/chat — VoteGuide AI election assistant endpoint.
=======
 * @fileoverview POST /api/chat — CivicFlow civic assistant endpoint.
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
 *
 * Accepts a user question, validates it with Zod, calls Gemini AI for an
 * answer, and falls back to a curated keyword-matched response when the API
 * key is absent or the call fails.
 *
 * @module app/api/chat/route
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { callGemini } from "@/lib/gemini";
import { CHAT_MESSAGE_MAX_LENGTH } from "@/lib/constants";
import type { ChatResponse } from "@/lib/types";

// ---------------------------------------------------------------------------
// Request validation schema
// ---------------------------------------------------------------------------

const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Please send a valid question.")
    .max(
      CHAT_MESSAGE_MAX_LENGTH,
      `Question is too long. Please keep it under ${CHAT_MESSAGE_MAX_LENGTH} characters.`
    ),
});

// ---------------------------------------------------------------------------
// Fallback responses (used when Gemini API is unavailable)
// ---------------------------------------------------------------------------

const FALLBACK_RESPONSES: Record<string, string> = {
  eligible:
    "You're generally eligible to vote if you're a citizen aged 18 or older and a registered resident of your voting district. Requirements vary by region — use our eligibility checker or visit your local election commission website for exact details.",
  register:
    "You can typically register to vote online through your election commission's website, in person at a government office, or by mail. Make sure to register before the deadline — it's often several weeks before election day!",
  document:
    "Common documents needed include a government-issued photo ID (like a passport or driver's license), proof of address (utility bill or bank statement), and your voter registration card or slip. Check your local requirements as they vary by region.",
  center:
    "Use our Nearby Centers feature to find your assigned polling station! You can also check your election commission's website. Your center is assigned based on your registered address. We recommend visiting the Centers page in the app.",
  "election day":
    "On election day: arrive at your assigned polling center during voting hours, bring your valid ID and voter slip, follow the instructions of polling officials, mark your ballot clearly, and verify your ink mark after voting. Arrive early to avoid long lines!",
  deadline:
    "Registration deadlines vary by region but are typically 2-4 weeks before election day. Some areas offer same-day registration. Check your local election commission website for exact dates — don't wait until the last minute!",
  language:
    "You can change your language anytime! Use the language switcher in the top navigation bar or go to Settings. All content, guides, and FAQs will be translated to your chosen language.",
  default:
    "That's a great question! While I'd need more specific details about your region to give an exact answer, I recommend checking our Timeline and Learn sections for general guidance, or visiting your local election commission's website for region-specific information.",
};

/**
 * Returns a keyword-matched fallback answer for common election queries.
 *
 * @param message - The raw user message (will be lower-cased internally).
 * @returns A pre-written response string.
 */
function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return FALLBACK_RESPONSES.default;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

/**
 * Handles POST /api/chat requests.
 *
 * @param req - Incoming Next.js request containing `{ message: string }` JSON body.
 * @returns JSON response with a `reply` field, or an error response.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ChatResponse | { reply: string }>> {
  try {
    const body = await req.json();
    const result = chatRequestSchema.safeParse(body);

    if (!result.success) {
      const errorMessage = result.error?.issues?.[0]?.message ?? "Invalid input";
      const status = errorMessage.includes("too long") ? 413 : 400;
      return NextResponse.json({ reply: errorMessage }, { status });
    }

    const { message } = result.data;
    // Strip HTML-significant characters to prevent any XSS in downstream rendering
    const sanitizedMessage = message.replace(/[<>]/g, "");

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const reply = await callGemini(sanitizedMessage, apiKey);
        if (reply) return NextResponse.json({ reply });
      } catch {
        // Intentionally swallowed — fall through to the curated fallback
      }
    }

    return NextResponse.json({ reply: getFallbackResponse(sanitizedMessage) });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
