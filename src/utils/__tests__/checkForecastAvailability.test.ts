import checkForecastAvailability from "@/utils/checkForecastAvailability";
import {
  describe,
  it,
  expect,
  vi,
  afterAll,
  beforeAll,
} from "vitest";

describe("function checkForecastAvailability", () => {
  beforeAll(() => {
    const today = new Date("2025-07-15T12:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(today);
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return the correct number of days to fetch forecast", () => {
    expect(checkForecastAvailability("15/07/2025 - 18/07/2025")).toBe(3);
  });

  it("should return an error for a end date before the start date", () => {
    expect(() =>
      checkForecastAvailability("15/07/2025 - 14/07/2025")
    ).toThrowError();
  });

  it("should return an error for a valid date range but in the past", () => {
    expect(() =>
      checkForecastAvailability("10/07/2025 - 14/07/2025")
    ).toThrowError();
  });

  it("should return an error for a date range longer than the maxForecastDays days", () => {
    expect(() =>
      checkForecastAvailability("15/07/2025 - 26/07/2025")
    ).toThrowError();
  });

  it("should return the correct number of days to fetch forecast for a date range with the same value as maxForecastDays", () => {
    expect(checkForecastAvailability("15/07/2025 - 25/07/2025")).toBe(10);
  });

});

