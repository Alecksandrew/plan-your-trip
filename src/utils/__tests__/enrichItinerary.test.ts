import enrichItinerary from "@/utils/enrichItinerary";
import {
  enrichedItineraryDataMock,
  enrichedItineraryDataNoWeatherMock,
} from "@/hooks/__tests__/__mocks__/enrichedItineraryDataMock";
import { rawItineraryDataMock } from "@/hooks/__tests__/__mocks__/rawItineraryDataMock";
import { allAttractionsImages } from "./__mocks__/allAttractionsImagesMock";
import { mockedWeatherData } from "@/hooks/__tests__/__mocks__/fetchWeatherDataMock";
import { describe, it, expect} from "vitest";

describe("function enrichItinerary", () => {
  //OBS: I didnt make a test without images because they will always show up even if it will be only a simple placeholder image

  const attractionsNames = rawItineraryDataMock.fullItinerary.flatMap((day) =>
    day.attractionsOfTheDay.map((attraction) => attraction.title)
  );

  it("should enrich the itinerary with the correct images and weather", () => {
    const result = enrichItinerary(
      attractionsNames,
      allAttractionsImages,
      rawItineraryDataMock,
      mockedWeatherData
    );

    expect(result).toEqual(enrichedItineraryDataMock);
  });

  it("should enrich the itinerary with the correct images and no weather", () => {
    const result = enrichItinerary(
      attractionsNames,
      allAttractionsImages,
      rawItineraryDataMock,
      undefined
    );

    expect(result).toEqual(enrichedItineraryDataNoWeatherMock);
  });

  it("should throw an error if the itineraryData is not valid", () => {
    const invalidItineraryData = {
  name: 'Teste',
  duration: 4,
  generalRecommendations: [],
  fullItinerary: []
};

    expect(() =>
      enrichItinerary(
        attractionsNames,
        allAttractionsImages,
        invalidItineraryData,
        mockedWeatherData
      )
    ).toThrowError();
  });
});
