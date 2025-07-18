import type { Itinerary } from "@/types/itineraryTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

export default function enrichItinerary(
  attractionsNames: string[],
  attractionsImages: string[][],
  itineraryData: Itinerary,
  weatherData: relevantForecastDays[] | undefined
): Itinerary {
  if (
    !itineraryData ||
    !itineraryData.fullItinerary ||
    !itineraryData.name ||
    !itineraryData.generalRecommendations
  ) {
    throw new Error(
      "Error when enriching itinerary: Invalid itinerary data. fullItinerary, name or generalRecommendations are missing."
    );
  }

  const dailyItinerary = itineraryData.fullItinerary;
  if (!dailyItinerary) {
    throw new Error("Error when accessing itineraryData property!");
  }

  //Map the attractions names with its images
  const imagesMap: Map<string, string[]> = new Map();
  attractionsNames.forEach((name, index) =>
    imagesMap.set(name, attractionsImages[index])
  );

  const enrichedDailyItinerary = dailyItinerary.map((day) => {
    if (!day || !day.dayNumber || !day.attractionsOfTheDay) {
      throw new Error(
        "Error when enriching itinerary: Invalid daily itinerary data. day, dayNumber or attractionsOfTheDay are missing."
      );
    }

    //Add its images to each attraction
    const attractionsWithImages = day.attractionsOfTheDay.map((attraction) => {
      if (!attraction || !attraction.title) {
        throw new Error(
          "Error when enriching itinerary: Invalid attraction data. attraction or title are missing."
        );
      }

      const photos = imagesMap.get(attraction.title);
      return { ...attraction, photos: photos };
    });

    //Add and return weather for eachday
    return {
      ...day,
      attractionsOfTheDay: attractionsWithImages,
      weather: weatherData?.[day.dayNumber - 1] || "Unavailable",
    };
  });

  const enrichedItinerary = {
    ...itineraryData,
    fullItinerary: enrichedDailyItinerary,
  };

  return enrichedItinerary;
}
