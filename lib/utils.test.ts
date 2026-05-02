import { calculateDistance } from "./utils";

describe("Utility Functions", () => {
  describe("calculateDistance", () => {
    it("should calculate distance correctly between two identical points as 0.0", () => {
      const distance = calculateDistance(19.076, 72.8777, 19.076, 72.8777); // Mumbai
      expect(distance).toBe("0.0");
    });

    it("should calculate distance correctly between Mumbai and Delhi", () => {
      // Mumbai: 19.0760, 72.8777
      // Delhi: 28.7041, 77.1025
      const distance = calculateDistance(19.076, 72.8777, 28.7041, 77.1025);
      // Rough distance is around 1148 km
      expect(parseFloat(distance)).toBeGreaterThan(1140);
      expect(parseFloat(distance)).toBeLessThan(1160);
    });
  });
});
