//Utils
import checkForecastAvailability from "@/utils/checkForecastAvailability";
import calculateDaysOffset from "@/utils/calculateDaysOffset";
import getRelevantForecast from "@/utils/getRelevantForecast";

//Services
import fetchGeocodingData from "./geocodingService";

//Types
import type { weatherBackendResponse } from "@/types/weatherTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

// i handled error with console.error and not throw new Error because this property is not a must
export default async function fetchWeatherData(
  placeName: string,
  dateRange: string
): Promise<relevantForecastDays[] | undefined> {
  const daysToFetchForecast = checkForecastAvailability(dateRange);

  const geocodingData = await fetchGeocodingData(placeName);

  const location = geocodingData?.data?.geometry?.location;
  if (!location || location.lat == null || location.lng == null) {
    throw new Error("Error when fetching geocoding data: Location not found");
  }

  const weatherParams = new URLSearchParams({
    lat: location.lat.toString(),
    lng: location.lng.toString(),
    days: daysToFetchForecast.toString(),
  });
  const BACKEND_URL: string = `http://localhost:3001/api/weather?${weatherParams}`;

  try {
    //I ONLY NEED THE WEATHER CONDITION OF EACH DAY
    const response = await fetch(BACKEND_URL);

    if (!response.ok) {
      throw new Error(
        "Error when fetching weather data: " + response.statusText
      );
    }

    const data: weatherBackendResponse = await response.json();

    //Calculate if the user start the trip today or in some days
    const startDate = dateRange.split(" - ")[0];
    const daysOffset = calculateDaysOffset(startDate);

    //Slice the forecast to get only the days that the user will be in the destination
    const forecastDays = data?.data?.forecastDays;
    if (forecastDays == undefined) {
      throw new Error(
        "Error when fetching weather data: Forecast days not found"
      );
    }
    const relevantForecast = getRelevantForecast(forecastDays, daysOffset);

    return relevantForecast;
  } catch (error) {
    console.log("OBJETO", error);
    console.error("Error when fetching weather data: " + error);
    return;
  }
}
