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
      if (!checkDateRangeAvailability(dateRange)) return;
      setProgress("20%");

      const [itineraryData, weatherData]: [Itinerary, relevantForecastDays[]] =
        await Promise.all([
          fetchTripItineraryData(personalizedPromptAI, formData),
          fetchWeatherData(placeName, dateRange),
        ]);
        console.log("PRIMEIRO DADO PARA MOCK FETCHTRIPTIITNERARY E FETCHWEATHER DATA:", { itineraryData, weatherData });
      setProgress("50%");

      const dailyItinerary = itineraryData.fullItinerary;

      //This gonna return a array with all attractions names
      const attractionsNames: string[] = dailyItinerary.flatMap((day) =>
        day.attractionsOfTheDay.map((attraction) => attraction.title)
      );
      setProgress("70%");

      const attractionsImages = await Promise.all(
        attractionsNames.map((name) => getAttractionImages(name, 3))
      );
      console.log("RESULTADO DO FETCH do getAttractionImages:", attractionsImages);
      setProgress("85%");

      const imagesMap: Map<string, string[]> = new Map();
      attractionsNames.forEach((name, index) =>
        imagesMap.set(name, attractionsImages[index])
      );

      const enrichedDailyItinerary = dailyItinerary.map((day) => {
        //Add its images to each attraction
        const attractionsWithImages = day.attractionsOfTheDay.map(
          (attraction) => {
            const photos = imagesMap.get(attraction.title);
            return { ...attraction, photos: photos || [] };
          }
        );

        //Add and return weather for eachday
        return {
          ...day,
          attractionsOfTheDay: attractionsWithImages,
          weather: weatherData?.[day.dayNumber - 1] || "Unknown",
        };
      });

      const comprehensiveItinerary = {
        ...itineraryData,
        fullItinerary: enrichedDailyItinerary,
      };

      setProgress("100%");
      setItinerary(comprehensiveItinerary);
      console.log("RESULTADO FINAL DO ITINERARY:", comprehensiveItinerary);
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




  console.log("VALOR DO ITINERARY NO HOOK:", { fetchItineraryData, itinerary, loading, error, progress });
  return { fetchItineraryData, itinerary, loading, error, progress };
}
