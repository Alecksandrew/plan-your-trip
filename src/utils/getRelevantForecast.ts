import type { ForecastDays } from "@/types/weatherTypes";

export type relevantForecastDays = {
  description: string;
  temperature: number;
};

function getRelevantForecastData(
  relevantForecast: ForecastDays[]
): relevantForecastDays[] {
  return relevantForecast.map((day) => {
    //Abstract only important information
    return {
      description: day.daytimeForecast?.weatherCondition?.description?.text,
      temperature: Math.round(
        (day.maxTemperature?.degrees + day.minTemperature?.degrees) / 2
      ),
      // Average temperature in Celsius
    };
  });
}

export default function getRelevantForecast(
  forecastDays: ForecastDays[],
  daysOffset: number
) {
  if (daysOffset <= 0) return;

  const relevantForecast = forecastDays.slice(daysOffset - 1);
  return getRelevantForecastData(relevantForecast);
}
