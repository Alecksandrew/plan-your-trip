import type { ForecastDays } from "@/types/weatherTypes";
export const forecastDaysMock: ForecastDays[] = [
  {
    daytimeForecast: {
      weatherCondition: {
        description: { text: "Sunny" }
      }
    },
    maxTemperature: { degrees: 30 },
    minTemperature: { degrees: 20 }
  },
  {
    daytimeForecast: {
      weatherCondition: {
        description: { text: "Cloudy" }
      }
    },
    maxTemperature: { degrees: 25 },
    minTemperature: { degrees: 18 }
  },
  {
    daytimeForecast: {
      weatherCondition: {
        description: { text: "Rainy" }
      }
    },
    maxTemperature: { degrees: 22 },
    minTemperature: { degrees: 16 }
  }
];