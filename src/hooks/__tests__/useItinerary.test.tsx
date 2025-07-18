//Configs
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";

//Custom hook
import useItinerary from "../useItinerary";

//
import { initialStateItinerary } from "../useItinerary";

//functions to be mocked
import fetchWeatherData from "@/services/weatherService";
import fetchTripItineraryData from "@/services/tripItineraryService";
import getAttractionImages from "@/services/attractionImages/getAttractionImagesService";
import enrichItinerary from "@/utils/enrichItinerary";

//mocks
import { mockedWeatherData } from "./__mocks__/fetchWeatherDataMock";
import { rawItineraryDataMock } from "./__mocks__/rawItineraryDataMock";
import { mockedImagesData } from "./__mocks__/getAttractionImagesMock";
import { enrichedItineraryDataMock } from "./__mocks__/enrichedItineraryDataMock";
import { mockedFormData } from "./__mocks__/formDataMock";

vi.mock("@/services/weatherService", () => ({ default: vi.fn() }));
vi.mock("@/services/tripItineraryService", () => ({ default: vi.fn() }));
vi.mock("@/services/attractionImages/getAttractionImagesService", () => ({
  default: vi.fn(),
}));
vi.mock("@/utils/checkDateRangeAvailability", () => ({ default: vi.fn() }));
vi.mock("@/utils/enrichItinerary", () => ({ default: vi.fn() }));

describe("Custom hook useItinerary", () => {
  beforeEach(() => {
    vi.mocked(fetchTripItineraryData).mockResolvedValue(rawItineraryDataMock);
    vi.mocked(fetchWeatherData).mockResolvedValue(mockedWeatherData);
    vi.mocked(getAttractionImages).mockResolvedValue(mockedImagesData);
    vi.mocked(enrichItinerary).mockReturnValue(enrichedItineraryDataMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("it should return all initial values correctly", () => {
    vi.useFakeTimers(); // Ativa fake timers

    const { result } = renderHook(() => useItinerary());

    expect(result.current.itinerary).toEqual(initialStateItinerary);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.progress).toBe("0%");
  });

  it("it should return final values correctly", async () => {
    const { result } = renderHook(() => useItinerary());

    await act(async () => {
      //act will ensure your test will run in the correct way because this gonna wait for all updates [state, promises, setTimeout...]
      await result.current.fetchItineraryData(mockedFormData);
    });

    //end
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.progress).toBe("100%");
    expect(result.current.itinerary).toEqual(enrichedItineraryDataMock);
  });

  it("it should handle errors correctly if the main information (itinerary) fails", async () => {
    const errorMessage =
      "Error when fetching trip itinerary data";
    vi.mocked(fetchTripItineraryData).mockRejectedValueOnce(
      new Error(errorMessage)
    );
    
    const { result } = renderHook(() => useItinerary());

  
    await act(async () => {
      await result.current.fetchItineraryData(mockedFormData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.itinerary).toEqual(initialStateItinerary);
    expect(getAttractionImages).not.toHaveBeenCalled();
  });

  it("it should handle errors correctly if the weather data fails -> weather is a optional property", async () => {
    //weater is a optional property, so if it fails, it should not break the app
    vi.mocked(fetchWeatherData).mockResolvedValue(
      undefined
    );

    const expectedItineraryWithoutWeather = {
    ...enrichedItineraryDataMock,
    fullItinerary: enrichedItineraryDataMock.fullItinerary.map(day => ({
      ...day,
      weather: "Unknown",
    })),
    };
    vi.mocked(enrichItinerary).mockReturnValue(expectedItineraryWithoutWeather);

    const { result } = renderHook(() => useItinerary());

    await act(async () => {
      await result.current.fetchItineraryData(mockedFormData);
    });

    //end
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.progress).toBe("100%");
    expect(result.current.itinerary).toEqual(expectedItineraryWithoutWeather);
  });

  it("it should handle errors correctly if the attractions images fails -> images are a optional property", async () => {
    //images are a optional property, so if it fails, it should not break the app, but show a placeholder image
    vi.mocked(getAttractionImages).mockResolvedValue(
     ["@/assets/placeholder-image.png"]
    );
    const expectedItineraryWithDefaultImage = {
      ...enrichedItineraryDataMock,
      fullItinerary: enrichedItineraryDataMock.fullItinerary.map(day => ({
        ...day,
        attractionsOfTheDay: day.attractionsOfTheDay.map(attraction => ({
          ...attraction,
          photos: ["@/assets/placeholder-image.png"],
        })),
      })),
    }
    vi.mocked(enrichItinerary).mockReturnValue(expectedItineraryWithDefaultImage);

    const { result } = renderHook(() => useItinerary());

    await act(async () => {
      await result.current.fetchItineraryData(mockedFormData);
    });

    //end
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.progress).toBe("100%");
    expect(result.current.itinerary).toEqual(expectedItineraryWithDefaultImage);
    expect(result.current.itinerary.fullItinerary[0].attractionsOfTheDay[0].photos).toEqual(["@/assets/placeholder-image.png"]);
  });
});
