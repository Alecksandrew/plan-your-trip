import type { ForecastDays } from "@/types/weatherTypes";

export type relevantForecastDays = {
  description: string;
  temperature: number | null;
};

export function getRelevantForecastData(
  relevantForecast: ForecastDays[]
): relevantForecastDays[] {
  return relevantForecast.map((day) => {
    //Abstract only important information

    const temperature =
      day.maxTemperature && day.minTemperature
        ? Math.round(
            (day.maxTemperature?.degrees + day.minTemperature?.degrees) / 2
          )
        : null;

    const description = day.daytimeForecast?.weatherCondition?.description?.text ?? null
    
    return {
      description: description ,
      temperature: temperature,
      // Average temperature in Celsius
    };
  });
}

export default function getRelevantForecast(
  forecastDays: ForecastDays[],
  daysOffset: number
) {
  if (daysOffset < 0) return;

  const relevantForecast = forecastDays.slice(daysOffset);
  return getRelevantForecastData(relevantForecast);
}
