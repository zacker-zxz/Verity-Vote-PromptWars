import { app } from "./firebase";

describe("Firebase Initialization", () => {
  it("should initialize the firebase app", () => {
    expect(app).toBeDefined();
  });
});
