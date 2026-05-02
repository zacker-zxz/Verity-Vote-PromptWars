import { NextRequest, NextResponse } from "next/server";

const ELECTION_CONTEXT = `You are VoteGuide AI — a friendly, knowledgeable election assistant. You help users understand:
- Voter eligibility requirements
- How to register to vote
- What documents are needed
- Where to find polling centers
- Election day procedures
- Deadlines and timelines
- Post-voting information

Rules:
- Keep answers concise (2-4 sentences max)
- Use simple, clear language
- Be encouraging and helpful
- If you don't know something specific, suggest the user check their local election commission
- Never give legal advice
- Always mention that requirements vary by region when relevant`;

// Fallback responses for when Gemini API is not configured
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

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return FALLBACK_RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ reply: "Please send a valid question." }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ reply: "Question is too long. Please keep it under 1000 characters." }, { status: 413 });
    }

    const sanitizedMessage = message.trim().replace(/[<>]/g, ""); // Basic XSS prevention

    // Try Gemini API if key is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { role: "user", parts: [{ text: `${ELECTION_CONTEXT}\n\nUser question: ${sanitizedMessage}` }] },
              ],
              generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback response
    return NextResponse.json({ reply: getFallbackResponse(message) });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
