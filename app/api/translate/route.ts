/**
 * @fileoverview POST /api/translate — Text translation endpoint for VoteGuide AI.
 *
 * Accepts source text and a target language code, validates with Zod, calls
 * the Google Cloud Translation API, and gracefully falls back to returning the
 * original text when no API key is configured.
 *
 * @module app/api/translate/route
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { translateText } from "@/lib/translate";
import { TRANSLATE_TEXT_MAX_LENGTH } from "@/lib/constants";
import type { TranslateResponse, ApiErrorResponse } from "@/lib/types";

// ---------------------------------------------------------------------------
// Request validation schema
// ---------------------------------------------------------------------------

const translateRequestSchema = z.object({
  text: z
    .string()
    .min(1, "Missing or invalid text")
    .max(
      TRANSLATE_TEXT_MAX_LENGTH,
      `Text too long for translation (max ${TRANSLATE_TEXT_MAX_LENGTH} chars).`
    ),
  targetLanguage: z.string().min(1, "Missing or invalid targetLanguage"),
});

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

/**
 * Handles POST /api/translate requests.
 *
 * @param req - Incoming Next.js request with `{ text: string; targetLanguage: string }` JSON body.
 * @returns JSON response with `translatedText` (and optionally a `note`), or an error response.
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<TranslateResponse | ApiErrorResponse>> {
  try {
    const body = await req.json();
    const result = translateRequestSchema.safeParse(body);

    if (!result.success) {
      const errorMessage = result.error?.issues?.[0]?.message ?? "Invalid input";
      const status = errorMessage.includes("too long") ? 413 : 400;
      return NextResponse.json({ error: errorMessage }, { status });
    }

    const { text, targetLanguage } = result.data;
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (apiKey) {
      try {
        const translated = await translateText(text, targetLanguage, apiKey);
        if (translated) return NextResponse.json({ translatedText: translated });
      } catch {
        // Intentionally swallowed — fall through to the graceful fallback
      }
    }

    // Graceful degradation: return the original text so the UI never breaks
    return NextResponse.json({
      translatedText: text,
      note: "Translation API not configured. Add GOOGLE_TRANSLATE_API_KEY to enable.",
    });
  } catch {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
