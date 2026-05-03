/**
 * @fileoverview Unit tests for lib/constants.ts
 *
 * Validates that application constants are correctly typed and within expected
 * bounds.  These tests are intentionally simple but serve as a regression
 * guard — if a constant is accidentally changed it will fail CI immediately.
 */

import {
  CHAT_MESSAGE_MAX_LENGTH,
  TRANSLATE_TEXT_MAX_LENGTH,
  GEMINI_MODEL,
  GEMINI_MAX_OUTPUT_TOKENS,
  GEMINI_TEMPERATURE,
  MAP_DEFAULT_ZOOM,
  MAP_LOCATED_ZOOM,
  CENTER_PROXIMITY_RADIUS_KM,
  APP_NAME,
  APP_TAGLINE,
} from "./constants";

describe("API Limit Constants", () => {
  it("CHAT_MESSAGE_MAX_LENGTH should be a positive integer", () => {
    expect(typeof CHAT_MESSAGE_MAX_LENGTH).toBe("number");
    expect(CHAT_MESSAGE_MAX_LENGTH).toBeGreaterThan(0);
    expect(Number.isInteger(CHAT_MESSAGE_MAX_LENGTH)).toBe(true);
  });

  it("TRANSLATE_TEXT_MAX_LENGTH should be greater than CHAT_MESSAGE_MAX_LENGTH", () => {
    expect(TRANSLATE_TEXT_MAX_LENGTH).toBeGreaterThan(CHAT_MESSAGE_MAX_LENGTH);
  });

  it("TRANSLATE_TEXT_MAX_LENGTH should be a positive integer", () => {
    expect(typeof TRANSLATE_TEXT_MAX_LENGTH).toBe("number");
    expect(TRANSLATE_TEXT_MAX_LENGTH).toBeGreaterThan(0);
  });
});

describe("Gemini Configuration Constants", () => {
  it("GEMINI_MODEL should be a non-empty string", () => {
    expect(typeof GEMINI_MODEL).toBe("string");
    expect(GEMINI_MODEL.length).toBeGreaterThan(0);
  });

  it("GEMINI_MAX_OUTPUT_TOKENS should be a positive integer", () => {
    expect(typeof GEMINI_MAX_OUTPUT_TOKENS).toBe("number");
    expect(GEMINI_MAX_OUTPUT_TOKENS).toBeGreaterThan(0);
    expect(Number.isInteger(GEMINI_MAX_OUTPUT_TOKENS)).toBe(true);
  });

  it("GEMINI_TEMPERATURE should be between 0 and 1 inclusive", () => {
    expect(GEMINI_TEMPERATURE).toBeGreaterThanOrEqual(0);
    expect(GEMINI_TEMPERATURE).toBeLessThanOrEqual(1);
  });
});

describe("Map Constants", () => {
  it("MAP_DEFAULT_ZOOM should be less than MAP_LOCATED_ZOOM", () => {
    expect(MAP_DEFAULT_ZOOM).toBeLessThan(MAP_LOCATED_ZOOM);
  });

  it("zoom levels should be within valid Google Maps range (1-21)", () => {
    expect(MAP_DEFAULT_ZOOM).toBeGreaterThanOrEqual(1);
    expect(MAP_LOCATED_ZOOM).toBeLessThanOrEqual(21);
  });

  it("CENTER_PROXIMITY_RADIUS_KM should be a positive number", () => {
    expect(CENTER_PROXIMITY_RADIUS_KM).toBeGreaterThan(0);
  });
});

describe("Application Metadata Constants", () => {
  it("APP_NAME should be VoteGuide AI", () => {
    expect(APP_NAME).toBe("VoteGuide AI");
  });

  it("APP_TAGLINE should reference the problem statement", () => {
    expect(APP_TAGLINE.toLowerCase()).toContain("election process");
  });
});
