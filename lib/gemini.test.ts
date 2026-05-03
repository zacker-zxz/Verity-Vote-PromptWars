<<<<<<< HEAD
import { callGemini, ELECTION_CONTEXT } from "./gemini";

jest.mock("@google/generative-ai", () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: () => "You must be 18 to vote.",
          },
        }),
      }),
    })),
  };
});

describe("callGemini", () => {
  it("should return the reply text on a successful SDK call", async () => {
    const result = await callGemini("Am I eligible?", "test-api-key");
    expect(result).toBe("You must be 18 to vote.");
=======
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
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
  });
});

describe("ELECTION_CONTEXT", () => {
  it("should be a non-empty string", () => {
    expect(typeof ELECTION_CONTEXT).toBe("string");
    expect(ELECTION_CONTEXT.length).toBeGreaterThan(0);
  });
<<<<<<< HEAD
=======

  it("should mention CivicFlow", () => {
    expect(ELECTION_CONTEXT).toContain("CivicFlow");
  });
>>>>>>> 07e37ac89f6262a75e08abc35848a720f8e03753
});
