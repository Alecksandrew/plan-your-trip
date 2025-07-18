import calculateDaysOffset from "@/utils/calculateDaysOffset";
import {
  describe,
  render,
  screen,
  it,
  expect,
  vi,
  afterAll,
  beforeAll,
} from "vitest";

describe("function calculateDaysOffset", () => {
  beforeAll(() => {
    const today = new Date("2025-07-18T12:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(today);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return the correct days offset", () => {
    expect(calculateDaysOffset("20/07/2025")).toBe(2);
  });

  it("should return a negative number for a past date", () => {
    expect(calculateDaysOffset("10/07/2025")).toBe(-8);
  });

  it("should return 0 for today's date", () => {
    expect(calculateDaysOffset("18/07/2025")).toBe(0);
  });

  it("should handle month transitions correctly", () => {
    expect(calculateDaysOffset("02/08/2025")).toBe(15);
  });

  it("should handle negative month transitions correctly", () => {
    expect(calculateDaysOffset("18/06/2025")).toBe(-30);
  });

  it("should throw a error for an invalide date format", () => {
    expect(() => calculateDaysOffset("2025/07/20")).toThrowError(
      "Error when calculating days offset: The start date is not in a valid format (DD/MM/YYYY)"
    );
  });
});
