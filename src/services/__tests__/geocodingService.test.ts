import { describe, it, vi, expect } from "vitest";
import { mockedGeocodingData } from "./__mocks__/geoodingDataMock";

import fetchGeocodingData from "../geocodingService";

describe("function fetchgeocoding", () => {
  it("It should return data correctly", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockedGeocodingData,
    });

    const result = await fetchGeocodingData("Rio de janeiro");

    expect(result).toEqual(mockedGeocodingData);
  });

  it("It should throw error if the API doesnt return a correct response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    });

    await expect(fetchGeocodingData("I dont know the place")).rejects.toThrow();
  });

  it("should throw an error if the fetch call itself fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    await expect(fetchGeocodingData("São Paulo")).rejects.toThrow();
  });

  it("should return undefined for invalid input without calling fetch", async () => {
    global.fetch = vi.fn();

    const resultEmpty = await fetchGeocodingData("");
    //@ts-expect-error: Testing bad cases in tests
    const resultNull = await fetchGeocodingData(null);

    expect(resultEmpty).toBeUndefined();
    expect(resultNull).toBeUndefined();

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
