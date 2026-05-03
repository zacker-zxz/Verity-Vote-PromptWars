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
  });
});

describe("ELECTION_CONTEXT", () => {
  it("should be a non-empty string", () => {
    expect(typeof ELECTION_CONTEXT).toBe("string");
    expect(ELECTION_CONTEXT.length).toBeGreaterThan(0);
  });
});
