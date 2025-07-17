import type { Itinerary } from "@/types/itineraryTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

export default function enrichItinerary(attractionsNames:string[], attractionsImages:string[][], itineraryData:Itinerary, weatherData:relevantForecastDays[] | undefined): Itinerary {

    const dailyItinerary = itineraryData?.fullItinerary;
    if (!dailyItinerary) {
        throw new Error("Error when accessing itineraryData property!");
    }

    //Map the attractions names with its images
    const imagesMap: Map<string, string[]> = new Map();
    attractionsNames.forEach((name, index) =>
        imagesMap.set(name, attractionsImages[index])
    );

    const enrichedDailyItinerary = dailyItinerary.map((day) => {
        //Add its images to each attraction
        const attractionsWithImages = day.attractionsOfTheDay.map(
        (attraction) => {
            const photos = imagesMap.get(attraction.title);
            return { ...attraction, photos: photos };
        }
        );

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