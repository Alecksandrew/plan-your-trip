import { describe, it, expect, vi, beforeAll } from "vitest";
import fetchWeatherData from "../weatherService";
import { mockedWeatherData } from "./__mocks__/weatherDataMock";
import { mockedRelevantForecast } from "./__mocks__/getRelevantForecastMock";

import fetchGeocodingData from "../geocodingService";
import { mockedGeocodingData } from "./__mocks__/geoodingDataMock";

vi.mock("../geocodingService", () => ({ default: vi.fn() }));

describe("function fetchWeatherData", () => {
  beforeAll(() => {
    const today = new Date("2025-07-20T12:00:00Z");
    vi.useFakeTimers();
    vi.setSystemTime(today);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockedWeatherData,
    });

    vi.mocked(fetchGeocodingData).mockResolvedValue(mockedGeocodingData);
  });

  it("should fetch weather data correctly", async () => {
    const result = await fetchWeatherData(
      "Rio de Janeiro",
      "20/07/2025 - 23/07/2025"
    );

    expect(result).toEqual(mockedRelevantForecast);
  });

  it("should return undefined if geocoding fails", async () => {
    vi.mocked(fetchGeocodingData).mockRejectedValue(new Error());

    const result = await fetchWeatherData(
      "Rio de Janeiro",
      "20/07/2025 - 23/07/2025"
    );

    expect(result).toBeUndefined();
  });

  it("should return undefined if geocoding data is malformed", async () => {
    // Simula um retorno de sucesso, mas com um objeto 'vazio'
    vi.mocked(fetchGeocodingData).mockResolvedValue({ data: {} });

    const result = await fetchWeatherData(
      "Rio de Janeiro",
      "20/07/2025 - 23/07/2025"
    );

    expect(result).toBeUndefined();
  });

  it("should return undefined if weather API fetch fails", async () => {
    vi.mocked(fetchGeocodingData).mockResolvedValue(mockedGeocodingData);

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    const result = await fetchWeatherData(
      "Rio de Janeiro",
      "20/07/2025 - 23/07/2025"
    );

    expect(result).toBeUndefined();
  });

  it("should return undefined if weather data is malformed", async () => {
    vi.mocked(fetchGeocodingData).mockResolvedValue(mockedGeocodingData);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });

    const result = await fetchWeatherData(
      "Rio de Janeiro",
      "20/07/2025 - 23/07/2025"
    );

    expect(result).toBeUndefined();
  });
});
