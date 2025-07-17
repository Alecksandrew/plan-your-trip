import { useState } from "react";

//services
import fetchWeatherData from "@/services/weatherService";
import fetchTripItineraryData from "@/services/tripItineraryService";
import getAttractionImages from "@/services/attractionImages/getAttractionImagesService";

//types
import type { FormsState } from "@/types/formInterfaces";
import type { Itinerary } from "@/types/itineraryTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

//const
import { personalizedPromptAI } from "@/constants/personalizedPromptAI";

//utils
import checkDateRangeAvailability from "@/utils/checkDateRangeAvailability";
import enrichItinerary from "@/utils/enrichItinerary";

export const initialStateItinerary: Itinerary = {
  name: "",
  duration: 0,
  generalRecommendations: [],
  fullItinerary: [],
};


export default function useItinerary() {
  const [itinerary, setItinerary] = useState<Itinerary>(initialStateItinerary);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<`${number}%`>("0%");

  async function fetchItineraryData(formData: FormsState) {
    setLoading(true);
    setError(null);
    setProgress("0%");

    try {
      const placeName = formData.destination;
      const dateRange = formData.date;

      if (!placeName || !dateRange) return;
      setTimeout(() => setProgress("10%"), 0); // I used timeout to react dont group the two setProgress in one render and my progress animation dont work properly
      checkDateRangeAvailability(dateRange);

      setTimeout(() => setProgress("20%"), 0); //Same as above

      const [itineraryData, weatherData]: [
        Itinerary,
        relevantForecastDays[] | undefined
      ] = await Promise.all([
        fetchTripItineraryData(personalizedPromptAI, formData),
        fetchWeatherData(placeName, dateRange),
      ]);

      setProgress("50%");

      const dailyItinerary = itineraryData?.fullItinerary;
      if (!dailyItinerary) {
        throw new Error("Error when accessing itineraryData property!");
      }

      //This gonna return a array with all attractions names
      const attractionsNames: string[] = dailyItinerary.flatMap((day) =>
        day.attractionsOfTheDay.map((attraction) => attraction.title)
      );
      setProgress("70%");

      const attractionsImages = await Promise.all(
        attractionsNames.map((name) => getAttractionImages(name, 3))
      );

      setProgress("85%");

      const enrichedItinerary = enrichItinerary(
        attractionsNames,
        attractionsImages,
        itineraryData,
        weatherData
      );

      setProgress("100%");
      setItinerary(enrichedItinerary);
    } catch (error: unknown) {
      console.error("ERRO CAPTURADO NO CATCH:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error when creating a itinerary!");
      }
    } finally {
      setTimeout(() => setLoading(false), 1000); // Delay in order to let the ProgressBar finish its animation
    }
  }

  return { fetchItineraryData, itinerary, loading, error, progress };
}
