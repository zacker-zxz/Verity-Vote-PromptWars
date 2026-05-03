/**
 * @fileoverview Unit tests for lib/gemini.ts
 *
 * Tests the callGemini helper in isolation by mocking global fetch.
 * This validates the happy path, graceful API failure handling, and
 * malformed-response resilience without making real network calls.
 */

import { callGemini, ELECTION_CONTEXT } from "./gemini";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("callGemini", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should return the reply text on a successful API call", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: "You must be 18 to vote." }] } }],
      }),
    });

    const result = await callGemini("Am I eligible?", "test-api-key");
    expect(result).toBe("You must be 18 to vote.");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should call the correct Gemini endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "ok" }] } }] }),
    });

    await callGemini("test", "my-key");
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("generativelanguage.googleapis.com");
    expect(calledUrl).toContain("my-key");
  });

  it("should include the election context in the request body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "ok" }] } }] }),
    });

    await callGemini("How do I register?", "test-key");
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.contents[0].parts[0].text).toContain(ELECTION_CONTEXT);
    expect(body.contents[0].parts[0].text).toContain("How do I register?");
  });

  it("should return null when the API response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await callGemini("test", "test-key");
    expect(result).toBeNull();
  });

  it("should return null when candidates array is empty", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ candidates: [] }),
    });
    const result = await callGemini("test", "test-key");
    expect(result).toBeNull();
  });

  it("should return null when response has no candidates field", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    const result = await callGemini("test", "test-key");
    expect(result).toBeNull();
  });

  it("should propagate fetch errors (caller is responsible for catching)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    await expect(callGemini("test", "test-key")).rejects.toThrow("Network error");
  });
});

describe("ELECTION_CONTEXT", () => {
  it("should be a non-empty string", () => {
    expect(typeof ELECTION_CONTEXT).toBe("string");
    expect(ELECTION_CONTEXT.length).toBeGreaterThan(0);
  });

  it("should mention CivicFlow", () => {
    expect(ELECTION_CONTEXT).toContain("CivicFlow");
  });
});
