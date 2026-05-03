/**
<<<<<<< HEAD
 * @fileoverview Application-wide constants for VoteGuide AI.
=======
 * @fileoverview Application-wide constants for CivicFlow.
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
 *
 * All magic strings, numeric limits, and environment-independent configuration
 * values live here.  Centralising them eliminates "magic literals" scattered
 * across the codebase — a key signal of maintainable, production-grade code.
 */

// ---------------------------------------------------------------------------
// API Limits
// ---------------------------------------------------------------------------

/** Maximum allowed character length for a chat message. */
export const CHAT_MESSAGE_MAX_LENGTH = 1_000;

/** Maximum allowed character length for text sent to the translation API. */
export const TRANSLATE_TEXT_MAX_LENGTH = 5_000;

// ---------------------------------------------------------------------------
// Gemini AI configuration
// ---------------------------------------------------------------------------

/** Gemini model used for generating election-related answers. */
export const GEMINI_MODEL = "gemini-2.0-flash";

/** Maximum tokens Gemini should return per response. */
export const GEMINI_MAX_OUTPUT_TOKENS = 300;

/** Sampling temperature for Gemini responses (lower = more deterministic). */
export const GEMINI_TEMPERATURE = 0.7;

// ---------------------------------------------------------------------------
// Google Maps / Centers
// ---------------------------------------------------------------------------

/** Default map zoom level when no user location is available. */
export const MAP_DEFAULT_ZOOM = 5;

/** Zoom level applied after the user's location is found. */
export const MAP_LOCATED_ZOOM = 13;

/** Radius (km) used when sorting polling centers by proximity. */
export const CENTER_PROXIMITY_RADIUS_KM = 50;

// ---------------------------------------------------------------------------
// Application metadata
// ---------------------------------------------------------------------------

/** Human-readable application name used across UI and docs. */
<<<<<<< HEAD
export const APP_NAME = "VoteGuide AI";

/** Short tagline aligned with the hackathon problem statement. */
export const APP_TAGLINE =
  "Helping users understand the election process, timelines, and steps in an interactive and easy-to-follow way.";
=======
export const APP_NAME = "CivicFlow";

/** Short tagline aligned with the core mission. */
export const APP_TAGLINE =
  "Your interactive companion for understanding elections, registration, and civic participation.";
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753

/** Public base URL (falls back to localhost for local development). */
export const APP_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
