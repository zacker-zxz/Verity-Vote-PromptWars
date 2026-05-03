/**
 * @fileoverview Gemini AI API client for CivicFlow.
 *
 * Centralises all calls to the Google Gemini generative language API so that
 * route handlers remain thin and business logic can be unit-tested in
 * isolation without mocking raw `fetch` internals.
 */

import type { GeminiRequest, GeminiResponse } from "./types";

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * System prompt that anchors CivicFlow to the civic-assistance domain.
 * Keeping it here (rather than inside the route handler) makes it easy to
 * update the persona without touching HTTP infrastructure.
 */
export const ELECTION_CONTEXT = `You are CivicFlow — a friendly, knowledgeable civic assistant designed to help users understand elections, registration, and participation in an interactive and easy-to-follow way. You help users with:
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

/**
 * Sends a user message to the Gemini API and returns the model's reply text.
 *
 * @param message - The sanitised user question.
 * @param apiKey  - Google Gemini API key (from environment).
 * @returns The reply string, or `null` if the API call fails / returns no content.
 *
 * @example
 * const reply = await callGemini("Am I eligible to vote?", process.env.GEMINI_API_KEY!);
 */
export async function callGemini(
  message: string,
  apiKey: string
): Promise<string | null> {
  const requestBody: GeminiRequest = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${ELECTION_CONTEXT}\n\nUser question: ${message}` }],
      },
    ],
    generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
  };

  const response = await fetch(`${GEMINI_BASE_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) return null;

  const data: GeminiResponse = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}
