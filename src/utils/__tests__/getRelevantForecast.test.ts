import { getRelevantForecastData } from "../getRelevantForecast";
import getRelevantForecast from "../getRelevantForecast";
import { forecastDaysMock } from "@/utils/__tests__/__mocks__/forecastDaysMock";
import { describe, it, expect } from "vitest";

describe("function getRelevantForecast", () => {
  it("should return relevant forecast if all data is correct", () => {
    const expected = [
      { description: "Rainy", temperature: 19 },
    ];

    expect(getRelevantForecast(forecastDaysMock, 2)).toEqual(expected);
  });

  it("should return correct values if daysOffset is 0", () => {
    const expected = getRelevantForecastData(forecastDaysMock); 
    
    expect(getRelevantForecast(forecastDaysMock, 0)).toEqual(expected);
  });

  it("should return temperature null when maxTemperature is missing", () => {
    const expected = [
      { description: "Rainy", temperature: null },
    ];

    const forecastDaysMockWithoutMaxTemperature = forecastDaysMock.map(
      (day) => {
        return { ...day, maxTemperature: null };
      }
    );

    const result = getRelevantForecast(
      forecastDaysMockWithoutMaxTemperature,
      2
    );

    expect(result).toEqual(expected);
  });

  it("should return description null when description is missing", () => {
    const expected = [
      { description: null, temperature: 19 },
    ];

    const forecastDaysMockWithoutDescription = forecastDaysMock.map((day) => ({
      ...day,
      daytimeForecast: {
        ...day.daytimeForecast,
        weatherCondition: {
          ...day.daytimeForecast.weatherCondition,
          description: null,
        },
      },
    }));

    const result = getRelevantForecast(forecastDaysMockWithoutDescription, 2);

    expect(result).toEqual(expected);
  });

  it("should return an empty array if daysOffset is larger than the array length", () => {
    expect(getRelevantForecast(forecastDaysMock, 10)).toEqual([]);
  });
});
