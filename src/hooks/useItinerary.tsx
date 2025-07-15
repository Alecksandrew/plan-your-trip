import { useEffect, useState } from "react";

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

const initialStateItinerary: Itinerary = {
  name: "",
  duration: 0,
  generalRecommendations: [],
  fullItinerary: [],
};

export default function useItinerary() {
  const [itinerary, setItinerary] = useState<Itinerary>(initialStateItinerary);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchItineraryData(formData: FormsState) {
    setLoading(true);
    setError(null);

    try {
      if (!formData.destination || !formData.date) return;
      console.log("ENTREI NO TRY E ESTOU DANDO FETCH NO ITINERARY");
      const placeName = formData.destination;
      const dateRange = formData.date;

      const [itineraryData, weatherData]: [Itinerary, relevantForecastDays[]] =
        await Promise.all([
          fetchTripItineraryData(personalizedPromptAI, formData),
          fetchWeatherData(placeName, dateRange),
        ]);

          console.log("DADOS BRUTOS DAS APIS:", { itineraryData, weatherData });
      const dailyItinerary = itineraryData.fullItinerary;

      //This gonna return a array with all attractions names
      const attractionsNames: string[] = dailyItinerary.flatMap((day) =>
        day.attractionsOfTheDay.map((attraction) => attraction.title)
      );

      const attractionsImages = await Promise.all(
        attractionsNames.map((name) => getAttractionImages(name, 3))
      );

        console.log("RESULTADO COMPLETO DA BUSCA DE IMAGENS:", attractionsImages);
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

      setItinerary(comprehensiveItinerary);
      console.log(`VALOR DO ITINERARY NO HOOK: ${JSON.stringify(comprehensiveItinerary)}`);
    } catch (error: unknown) {

      console.error("ERRO CAPTURADO NO CATCH:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error when creating a itinerary!");
      }
    } finally {
      setLoading(false);
    }
  }





  return { fetchItineraryData, itinerary, loading, error };
}
