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
import { mockedFormData } from "./__mocks__/formDataMock";

//resolved mocks
import { mockedFetchItineraryData } from "./__mocks__/fetchItineraryDataMock";
import { mockedWeatherData } from "./__mocks__/fetchWeatherDataMock";
import { mockedImagesData } from "./__mocks__/getAttractionImagesMock";

vi.mock("@/services/weatherService");
vi.mock("@/services/tripItineraryService");
vi.mock("@/services/attractionImages/getAttractionImagesService");

describe("Custom hook useItinerary", () => {
   beforeEach(() => {
    vi.useFakeTimers();
  });

  // Volta para os timers reais depois de cada teste
  afterEach(() => {
    vi.useRealTimers();
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
    vi.mocked(fetchWeatherData).mockResolvedValue(mockedWeatherData);
    vi.mocked(fetchTripItineraryData).mockResolvedValue(
      mockedFetchItineraryData
    );
    vi.mocked(getAttractionImages).mockResolvedValue(mockedImagesData);

    const { result } = renderHook(() => useItinerary());

    
  await act(async () => {
    result.current.fetchItineraryData(mockedFormData);
  });

  // Avança todos os timers para completar os setTimeout
  await act(async () => {
    await vi.runAllTimersAsync();
  });

  // Aguarda o estado final
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.progress).toBe("100%");
  });

  expect(result.current.itinerary).not.toEqual(initialStateItinerary);
  expect(result.current.error).toBe(null);
    

  }, 10000);
});
