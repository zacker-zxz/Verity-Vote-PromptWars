/**
 * @fileoverview Unit tests for lib/translate.ts
 *
 * Tests the translateText helper in isolation by mocking global fetch.
 * Validates the happy path, API error handling, and malformed-response
 * resilience without making real network calls.
 */

import { translateText } from "./translate";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("translateText", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should return the translated text on a successful API call", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { translations: [{ translatedText: "नमस्ते" }] },
      }),
    });

    const result = await translateText("Hello", "hi", "test-api-key");
    expect(result).toBe("नमस्ते");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should call the correct Google Translate endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { translations: [{ translatedText: "ok" }] },
      }),
    });

    await translateText("Hello", "hi", "my-key");
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("translation.googleapis.com");
    expect(calledUrl).toContain("my-key");
  });

  it("should send the correct request body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { translations: [{ translatedText: "ok" }] },
      }),
    });

    await translateText("Hello world", "ta", "test-key");
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.q).toBe("Hello world");
    expect(body.target).toBe("ta");
    expect(body.format).toBe("text");
  });

  it("should return null when the API response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await translateText("Hello", "hi", "test-key");
    expect(result).toBeNull();
  });

  it("should return null when translations array is empty", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { translations: [] } }),
    });
    const result = await translateText("Hello", "hi", "test-key");
    expect(result).toBeNull();
  });

  it("should return null when response has no data field", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    const result = await translateText("Hello", "hi", "test-key");
    expect(result).toBeNull();
  });

  it("should propagate fetch errors (caller is responsible for catching)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("DNS resolution failed"));
    await expect(translateText("Hello", "hi", "test-key")).rejects.toThrow(
      "DNS resolution failed"
    );
  });
});
