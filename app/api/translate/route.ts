import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0 || !targetLanguage || typeof targetLanguage !== "string") {
      return NextResponse.json({ error: "Missing or invalid text or targetLanguage" }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: "Text too long for translation (max 5000 chars)." }, { status: 413 });
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: text,
              target: targetLanguage,
              format: "text",
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const translated = data.data?.translations?.[0]?.translatedText;
          if (translated) {
            return NextResponse.json({ translatedText: translated });
          }
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback: return original text with a note
    return NextResponse.json({
      translatedText: text,
      note: "Translation API not configured. Add GOOGLE_TRANSLATE_API_KEY to enable.",
    });
  } catch {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
