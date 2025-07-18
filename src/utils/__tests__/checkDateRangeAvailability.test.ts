import checkDateRangeAvailability from "@/utils/checkDateRangeAvailability";
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

describe("function checkDateRangeAvailability", () => {
  beforeAll(() => {
    const today = new Date("2025-07-18T12:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(today);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return true for a valid date range", () => {
    expect(checkDateRangeAvailability("15/10/2027 - 18/10/2027")).toBe(true);
  });

  it("should throw an error for a date range longer than the maxDays days", () => {
    expect(() =>
      checkDateRangeAvailability("15/10/2025 - 30/10/2025")
    ).toThrowError();
  });

  it("should throw an error for a date range with the end date before the start date", () => {
    expect(() =>
      checkDateRangeAvailability("15/10/2025 - 14/10/2025")
    ).toThrowError();
  });

  it("should return true for a date range with the same value as maxDays", () => {
    expect(checkDateRangeAvailability("15/10/2025 - 28/10/2025")).toBe(true);
  });

  it("should return true for a minimum date range of 1 day", () => {
    expect(checkDateRangeAvailability("15/10/2025 - 15/10/2025")).toBe(true);
  });

  it("should return false for a date range which start in the past", () => {
    expect(() =>
      checkDateRangeAvailability("15/10/2022 - 18/10/2022")
    ).toThrowError();
  });
});
