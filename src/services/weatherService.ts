//Utils
import checkForecastAvailability from "@/utils/checkForecastAvailability";
import calculateDaysOffset from "@/utils/calculateDaysOffset";
import getRelevantForecast from "@/utils/getRelevantForecast";

//Services
import fetchGeocodingData from "./geocodingService";

//Types
import type { weatherBackendResponse } from "@/types/weatherTypes";
import type { relevantForecastDays } from "@/utils/getRelevantForecast";

import { API_BASE_URL } from "@/config/api"

// i handled error with console.error and not throw new Error because this property is not a must
export default async function fetchWeatherData(
  placeName: string,
  dateRange: string
): Promise<relevantForecastDays[] | undefined> {
  
  try {
  const daysToFetchForecast = checkForecastAvailability(dateRange);

  const geocodingData = await fetchGeocodingData(placeName);

  const location = geocodingData?.data?.geometry?.location;
  if (!location || location.lat == null || location.lng == null) {
    //If geocoding fails, this means te location doesnt exist, so i have to stop everything!!!
    // The others erros can return undefined without problem
    throw new Error("Error when fetching geocoding data: Location not found");
  }

  const weatherParams = new URLSearchParams({
    lat: location.lat.toString(),
    lng: location.lng.toString(),
    days: daysToFetchForecast.toString(),
  });
  const BACKEND_URL: string = `${API_BASE_URL}/api/weather?${weatherParams}`;

  
    //I ONLY NEED THE WEATHER CONDITION OF EACH DAY
    const response = await fetch(BACKEND_URL);

if (!response.ok) {
    if (response.status === 404) {
        throw new Error("Location not found");
    }
    throw new Error(`Error when fetching weather data: ${response.statusText}`);
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
   if (
    error instanceof Error &&
    (
      error.message.includes("Location not found") ||
      error.message.includes("Error when fetching weather data") ||
      error.message.includes("Error when fetching geocoding data")
    )
    ) {
      // Relança APENAS se for um dos dois erros específicos
      throw new Error("Destino não encontrado! Verifique se o nome do local existe");
    }

    // Para qualquer outro erro, apenas loga e retorna undefined
    console.error("Error when fetching weather data: " + error);
    return;
    }
}
