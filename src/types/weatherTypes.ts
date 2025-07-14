//API TYPE
export type Description = {
  text: string;
};

export type WeatherCondition = {
  description: Description;
};

export type Temperature = {
  degrees: number;
};

export type DayForecast = {
  weatherCondition: WeatherCondition;
};

export type ForecastDays = {
  daytimeForecast: DayForecast;
  maxTemperature: Temperature;
  minTemperature: Temperature;
};

export type weatherAPIResponse = {
  forecastDays: ForecastDays[];
};

export type weatherBackendResponse = {
  data: weatherAPIResponse;
};


