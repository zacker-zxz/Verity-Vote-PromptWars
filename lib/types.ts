/**
 * @fileoverview Shared TypeScript interfaces and types for CivicFlow API.
 *
 * Central type definitions for request/response payloads across API routes,
 * client stores, and component props.  Keeping types in one place prevents
 * circular dependencies and ensures consistency between frontend and backend.
 */

// ---------------------------------------------------------------------------
// API Request / Response shapes
// ---------------------------------------------------------------------------

/** Payload sent to POST /api/chat */
export interface ChatRequest {
  message: string;
}

/** Successful response from POST /api/chat */
export interface ChatResponse {
  reply: string;
}

/** Payload sent to POST /api/translate */
export interface TranslateRequest {
  text: string;
  targetLanguage: string;
}

/** Successful response from POST /api/translate */
export interface TranslateResponse {
  translatedText: string;
  note?: string;
}

/** Generic API error response */
export interface ApiErrorResponse {
  error: string;
}

// ---------------------------------------------------------------------------
// Gemini AI types
// ---------------------------------------------------------------------------

/** A single content part in a Gemini request */
export interface GeminiPart {
  text: string;
}

/** A content object in the Gemini request body */
export interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

/** Full Gemini generateContent request body */
export interface GeminiRequest {
  contents: GeminiContent[];
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
  };
}

/** Candidate in a Gemini response */
export interface GeminiCandidate {
  content: {
    parts: GeminiPart[];
  };
}

/** Full Gemini API response */
export interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

// ---------------------------------------------------------------------------
// Google Translate types
// ---------------------------------------------------------------------------

/** Single translation result from Google Translate API */
export interface GoogleTranslation {
  translatedText: string;
  detectedSourceLanguage?: string;
}

/** Full Google Translate API response */
export interface GoogleTranslateResponse {
  data?: {
    translations?: GoogleTranslation[];
  };
}

// ---------------------------------------------------------------------------
// App-level types
// ---------------------------------------------------------------------------

/** Supported language code (ISO 639-1) */
export type LanguageCode = "en" | "hi" | "ta" | "te" | "bn" | "mr" | "gu" | "kn";

/** Voter registration status */
export type RegistrationStatus = "registered" | "not_registered" | "unsure";
