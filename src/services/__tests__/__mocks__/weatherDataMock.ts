export const mockedWeatherData = {
  data: {
    forecastDays: [
      {
        interval: {
          startTime: "2025-07-19T10:00:00Z",
          endTime: "2025-07-20T10:00:00Z",
        },
        displayDate: { year: 2025, month: 7, day: 19 },
        daytimeForecast: {
          interval: {
            startTime: "2025-07-19T10:00:00Z",
            endTime: "2025-07-19T22:00:00Z",
          },
          weatherCondition: {
            iconBaseUri: "https://maps.gstatic.com/weather/v1/party_cloudy",
            description: { text: "Partly sunny", languageCode: "en" },
            type: "PARTLY_CLOUDY",
          },
          relativeHumidity: 62,
          uvIndex: 5,
          precipitation: {
            probability: { percent: 0, type: "RAIN" },
            snowQpf: { quantity: 0, unit: "MILLIMETERS" },
            qpf: { quantity: 0, unit: "MILLIMETERS" },
          },
          thunderstormProbability: 0,
          wind: {
            direction: { degrees: 240, cardinal: "WEST_SOUTHWEST" },
            speed: { value: 16, unit: "KILOMETERS_PER_HOUR" },
            gust: { value: 31, unit: "KILOMETERS_PER_HOUR" },
          },
          cloudCover: 40,
          iceThickness: { thickness: 0, unit: "MILLIMETERS" },
        },
        nighttimeForecast: {
          interval: {
            startTime: "2025-07-19T22:00:00Z",
            endTime: "2025-07-20T10:00:00Z",
          },
          weatherCondition: {
            iconBaseUri: "https://maps.gstatic.com/weather/v1/partly_clear",
            description: { text: "Partly cloudy", languageCode: "en" },
            type: "PARTLY_CLOUDY",
          },
          relativeHumidity: 84,
          uvIndex: 0,
          precipitation: {
            probability: { percent: 10, type: "RAIN" },
            snowQpf: { quantity: 0, unit: "MILLIMETERS" },
            qpf: { quantity: 0, unit: "MILLIMETERS" },
          },
          thunderstormProbability: 0,
          wind: {
            direction: { degrees: 278, cardinal: "WEST" },
            speed: { value: 11, unit: "KILOMETERS_PER_HOUR" },
            gust: { value: 21, unit: "KILOMETERS_PER_HOUR" },
          },
          cloudCover: 80,
          iceThickness: { thickness: 0, unit: "MILLIMETERS" },
        },
        maxTemperature: { degrees: 24.6, unit: "CELSIUS" },
        minTemperature: { degrees: 18.6, unit: "CELSIUS" },
        feelsLikeMaxTemperature: { degrees: 26.4, unit: "CELSIUS" },
        feelsLikeMinTemperature: { degrees: 18.6, unit: "CELSIUS" },
        sunEvents: {
          sunriseTime: "2025-07-19T09:32:13.799867404Z",
          sunsetTime: "2025-07-19T20:26:20.928138894Z",
        },
        moonEvents: {
          moonPhase: "WANING_CRESCENT",
          moonriseTimes: ["2025-07-19T04:10:52.313345235Z"],
          moonsetTimes: ["2025-07-19T15:23:05.903802061Z"],
        },
        maxHeatIndex: { degrees: 26.4, unit: "CELSIUS" },
      },
       {
        interval: {
          startTime: "2025-07-20T10:00:00Z",
          endTime: "2025-07-21T10:00:00Z",
        },
        displayDate: { year: 2025, month: 7, day: 20 },
        daytimeForecast: {
          interval: {
            startTime: "2025-07-20T10:00:00Z",
            endTime: "2025-07-20T22:00:00Z",
          },
          weatherCondition: {
            iconBaseUri: "https://maps.gstatic.com/weather/v1/clear",
            description: { text: "Sunny", languageCode: "en" },
            type: "CLEAR",
          },
          relativeHumidity: 55,
          uvIndex: 8,
          precipitation: {
            probability: { percent: 0, type: "RAIN" },
            snowQpf: { quantity: 0, unit: "MILLIMETERS" },
            qpf: { quantity: 0, unit: "MILLIMETERS" },
          },
          thunderstormProbability: 0,
          wind: {
            direction: { degrees: 180, cardinal: "SOUTH" },
            speed: { value: 12, unit: "KILOMETERS_PER_HOUR" },
            gust: { value: 25, unit: "KILOMETERS_PER_HOUR" },
          },
          cloudCover: 10,
          iceThickness: { thickness: 0, unit: "MILLIMETERS" },
        },
        nighttimeForecast: {
          // ...
        },
        maxTemperature: { degrees: 22, unit: "CELSIUS" },
        minTemperature: { degrees: 22, unit: "CELSIUS" },
        feelsLikeMaxTemperature: { degrees: 29.1, unit: "CELSIUS" },
        feelsLikeMinTemperature: { degrees: 20.5, unit: "CELSIUS" },
        sunEvents: {
          sunriseTime: "2025-07-20T09:32:45.123Z",
          sunsetTime: "2025-07-20T20:26:55.456Z",
        },
        moonEvents: {
          // ...
        },
        maxHeatIndex: { degrees: 29.1, unit: "CELSIUS" },
      },
       {
        interval: {
          startTime: "2025-07-21T10:00:00Z",
          endTime: "2025-07-22T10:00:00Z",
        },
        displayDate: { year: 2025, month: 7, day: 21 },
        daytimeForecast: {
          interval: {
            startTime: "2025-07-21T10:00:00Z",
            endTime: "2025-07-21T22:00:00Z",
          },
          weatherCondition: {
            iconBaseUri: "https://maps.gstatic.com/weather/v1/rain",
            description: { text: "Partly cloudy", languageCode: "en" },
            type: "RAIN",
          },
          relativeHumidity: 88,
          uvIndex: 1,
          precipitation: {
            probability: { percent: 90, type: "RAIN" },
            snowQpf: { quantity: 0, unit: "MILLIMETERS" },
            qpf: { quantity: 15, unit: "MILLIMETERS" },
          },
          thunderstormProbability: 40,
          wind: {
            direction: { degrees: 310, cardinal: "NORTHWEST" },
            speed: { value: 25, unit: "KILOMETERS_PER_HOUR" },
            gust: { value: 45, unit: "KILOMETERS_PER_HOUR" },
          },
          cloudCover: 95,
          iceThickness: { thickness: 0, unit: "MILLIMETERS" },
        },
        nighttimeForecast: {
          // ...
        },
        maxTemperature: { degrees: 23, unit: "CELSIUS" },
        minTemperature: { degrees: 23, unit: "CELSIUS" },
        feelsLikeMaxTemperature: { degrees: 19.5, unit: "CELSIUS" },
        feelsLikeMinTemperature: { degrees: 14.2, unit: "CELSIUS" },
        sunEvents: {
          sunriseTime: "2025-07-21T09:33:10.789Z",
          sunsetTime: "2025-07-21T20:27:18.123Z",
        },
        moonEvents: {
          // ...
        },
        maxHeatIndex: { degrees: 19.5, unit: "CELSIUS" },
      },      
    ],
    timeZone: { id: "America/Sao_Paulo" },
  },
};
