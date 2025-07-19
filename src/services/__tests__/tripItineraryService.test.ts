import { describe, it, vi, expect } from "vitest";
import fetchTripItineraryData from "../tripItineraryService";
import { rawItineraryDataMock } from "@/hooks/__tests__/__mocks__/rawItineraryDataMock";
import { mockedFormData } from "@/hooks/__tests__/__mocks__/formDataMock";
import { personalizedPromptAI } from "@/constants/personalizedPromptAI";

describe("function tripItinerary", () => {
  it("should return a correct itinerary", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ response: JSON.stringify(rawItineraryDataMock) }),
    });

    const result = await fetchTripItineraryData(
      personalizedPromptAI,
      mockedFormData
    );

    expect(result).toEqual(rawItineraryDataMock);
  });

  it("should throw an error if the server return a bad answer", async() => {

    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Unavailable itinerary"
    })

    await expect(fetchTripItineraryData(
      personalizedPromptAI,
      mockedFormData
    )).rejects.toThrow("Unavailable itinerary");
    })

    it("should throw an error if the communication with the server fails", async() => {

        global.fetch = vi.fn().mockRejectedValue(new Error())

        await expect(fetchTripItineraryData(personalizedPromptAI, mockedFormData)).rejects.toThrow()
    })

    it("should throw an error if server return malformed response", async() => {

        global.fetch = vi.fn().mockResolvedValue({ok: true, json: () => Promise.resolve({})})

        await expect(fetchTripItineraryData(personalizedPromptAI, mockedFormData)).rejects.toThrow()
    })

    
});
