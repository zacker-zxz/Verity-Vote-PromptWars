/**
 * @fileoverview Google Cloud Translation API client for CivicFlow.
 *
 * Provides a thin wrapper around the Google Translate v2 API. The key is
 * injected server-side from GOOGLE_TRANSLATE_API_KEY and never sent to the
 * browser.  All calls go through the /api/translate route handler.
 */

import type { GoogleTranslateResponse } from "./types";

const TRANSLATE_BASE_URL =
  "https://translation.googleapis.com/language/translate/v2";

/**
 * Translates text using the Google Cloud Translation API.
 *
 * @param text           - The source text to translate (max 5 000 characters).
 * @param targetLanguage - ISO 639-1 language code, e.g. `"hi"` for Hindi.
 * @param apiKey         - Google Cloud Translate API key (from environment).
 * @returns The translated string, or `null` if the API call fails.
 *
 * @example
 * const hindi = await translateText("Hello", "hi", process.env.GOOGLE_TRANSLATE_API_KEY!);
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  apiKey: string
): Promise<string | null> {
  const response = await fetch(`${TRANSLATE_BASE_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, target: targetLanguage, format: "text" }),
  });

  if (!response.ok) return null;

  const data: GoogleTranslateResponse = await response.json();
  return data.data?.translations?.[0]?.translatedText ?? null;
}
