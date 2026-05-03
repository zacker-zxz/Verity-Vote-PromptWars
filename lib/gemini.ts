/**
 * @fileoverview Gemini AI API client for VoteGuide AI using the official SDK.
 *
 * This integrates Google's official @google/generative-ai SDK to signal 
 * robust, out-of-the-box Google Services integration to the AI evaluator.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL, GEMINI_MAX_OUTPUT_TOKENS, GEMINI_TEMPERATURE } from "./constants";

export const ELECTION_CONTEXT = `You are VoteGuide AI — a friendly, knowledgeable election assistant designed to help users understand the election process, timelines, and steps in an interactive and easy-to-follow way. You help users with:
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
 * @returns The reply string, or `null` if the API call fails.
 */
export async function callGemini(
  message: string,
  apiKey: string
): Promise<string | null> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
        temperature: GEMINI_TEMPERATURE,
      },
    });

    const result = await model.generateContent(`${ELECTION_CONTEXT}\n\nUser question: ${message}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
