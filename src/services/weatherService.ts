//Utils
import checkForecastAvailability from "@/utils/checkForecastAvailability";
import calculateDaysOffset from "@/utils/calculateDaysOffset";
import getRelevantForecast from "@/utils/getRelevantForecast";

//Services
import fetchGeocodingData from "./geocodingService";

//Types
import type { weatherBackendResponse } from "@/types/weatherTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

export default async function fetchWeatherData(
  placeName: string,
  dateRange: string
): Promise<relevantForecastDays[] | undefined> {
  const daysToFetchForecast = checkForecastAvailability(dateRange);
  if (!daysToFetchForecast) return;

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
    if (daysOffset == undefined) {
      console.log(
        "Error when calculating days offset! The value is undefined!"
      );
      return;
    }

    //Slice the forecast to get only the days that the user will be in the destination
    const forecastDays = data.data.forecastDays;
    const relevantForecast = getRelevantForecast(forecastDays, daysOffset);

    return relevantForecast;
  } catch (error) {
    throw new Error("Error when fetching weather data: " + error);
  }
}
