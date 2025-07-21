import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import { cleanup, render, screen, act } from "@testing-library/react";
import FullItinerary from "../ItinerarySection/FullItinerary";

import { enrichedItineraryDataMock } from "@/hooks/__tests__/__mocks__/enrichedItineraryDataMock";
import type { Itinerary } from '@/types/itineraryTypes';
export const initialStateItinerary: Itinerary = {
  name: "",
  duration: 0,
  generalRecommendations: [],
  fullItinerary: [],
};

describe("FullItinerary", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("displays the correct itinerary name and duration in the title", () => {
    render(
      <FullItinerary
        itineraryData={enrichedItineraryDataMock}
        loading={false}
        progress="0%"
      />
    );

    expect(
      screen.getByText(
        new RegExp(
          `Roteiro: ${enrichedItineraryDataMock.name} - ${enrichedItineraryDataMock.duration} dias`,
          "i"
        )
      )
    ).toBeInTheDocument();
  });

  it("shows the progress bar and skeleton loader when loading is true", () => {
    render(
      <FullItinerary
        itineraryData={enrichedItineraryDataMock}
        loading={true}
        progress="50%"
      />
    );

    expect(
      screen.getByText(/Wait, we are creating your itinerary!/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByTestId("daily-itinerary-skeleton")).toBeInTheDocument();
  });

  it("renders DailyItinerary components when loading is false", () => {
    render(
      <FullItinerary
        itineraryData={enrichedItineraryDataMock}
        loading={false}
        progress="100%"
      />
    );

    enrichedItineraryDataMock.fullItinerary.forEach(({ dayNumber }) => {
      expect(
        screen.getByText(new RegExp(`Dia ${dayNumber}`, "i"))
      ).toBeInTheDocument();
    });
  });

  it("keeps loading state for 1 second after loading turns false", async () => {
    const { rerender } = render(
      <FullItinerary
        itineraryData={initialStateItinerary}
        loading={true}
        progress="10%"
      />
    );

    expect(
      screen.getByText(/Wait, we are creating your itinerary!/i)
    ).toBeInTheDocument();

    rerender(
      <FullItinerary
        itineraryData={enrichedItineraryDataMock}
        loading={false}
        progress="100%"
      />
    );

    expect(
      screen.getByText(/Wait, we are creating your itinerary!/i)
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(
      screen.queryByText(/Wait, we are creating your itinerary!/i)
    ).not.toBeInTheDocument();

    enrichedItineraryDataMock.fullItinerary.forEach(({ dayNumber }) => {
      expect(
        screen.getByText(new RegExp(`Dia ${dayNumber}`, "i"))
      ).toBeInTheDocument();
    });
  });
});
