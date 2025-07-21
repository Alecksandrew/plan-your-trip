import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import DailyItinerary from "../ItinerarySection/DailyItinerary";

describe("DailyItinerary", () => {
  afterEach(() => cleanup());

  const weatherData = {
    description: "Sunny",
    temperature: 23,
  };

  const emptyWeatherData = { description: "", temperature: null };

  const attractionsOfTheDay = [
    {
      description: "Tour de barco essencial para conhecer as belezas escondidas de Arraial do Cabo, incluindo paradas em praias isoladas e grutas fascinantes como a Gruta Azul.",
      openingHours: "Saídas a partir das 09h às 14h (verificar com operadoras locais)",
      title: "Passeio de Barco (inclui Praia do Farol, Gruta Azul, Fenda de Nossa Senhora)",
      photos: [
        "https://lh3.googleusercontent.com/place-photos/AJnk2cwkxKfR77YDtGFPp3eM5pO1P04F0TkRhdUmJw31e5cenyca8lYWYSxHehe5VQYL0EQAOwM1kuDCT4c0e5WI-2JAYq2g8RfsgXioyJRV_48NvsKVQEOldjgTs_o7INqrOA-Wfeh9Pj34Avwu6A=s4800-w400-h400",
        "https://lh3.googleusercontent.com/place-photos/AJnk2cw-59YWx0aecaBmfnW7pqDnw_roWT9egc4mc75HPiQF92wJcLRvXw_m4KJ7sBVzmxiR3ZCjXmoSlheuug_pZXRTHn0cPMvDLIA3dTdWMu2UacXhYNcCsZJC2c5Zhz0wwqWDutyv09rm3-9P0A=s4800-w400-h400",
        "https://lh3.googleusercontent.com/place-photos/AJnk2cwtdwmRmnI91hPTikaAoaXb-jT1t3RLXCwBV4xmm02PQYeDdu9JfRG2SQmrtwnZxwojlkb7CYluk4zlhDoIn5yHMUffK_HcC8OHZHRxwwS5odc9dKraUyAoBzR7Hlrs6DiKyUNAgA6Z-w6ZKX4=s4800-w400-h400"
      ]
    },
    {
      description: "Acessível por trilha ou táxi-barco a partir da Praia dos Anjos, esta praia encanta com suas águas calmas e transparentes, ideais para snorkeling.",
      openingHours: "Durante o dia",
      title: "Praia do Forno",
      photos: [
        "https://lh3.googleusercontent.com/place-photos/AJnk2cxpAvarrev3dB9ayif7EGqbzKZo3RCsEWJYmJJDnPvNvsjbsQT7HzS0QK9k8IEUuoSLtL1B2djQpLhqz0rSBR4tBzmtcCaLOoKW4-mfWzq2WRdBle0XDCdlteDh8KzR-erc3AFs5M8f2ufOCQ=s4800-w400-h400",
        "https://lh3.googleusercontent.com/place-photos/AJnk2czgjG9EVppz_tJ8XQv7c6LWzNz4Tima-r-KvxwFtasrJyXqxML_o27n48-q35mqpBikOQ_SgwOyfyBcavwbW7VGlprGa6fcsUW-Mj_I2RnCuW3V0BtqDv0JOh-D6gto9Ai4ehwhObYa1YZPTw=s4800-w400-h400",
        "https://lh3.googleusercontent.com/place-photos/AJnk2czrbsFu2Ka7qR9VL6CvH0kgPcmTW_pZcOVKqc2XYmPTx_9NyzxSlb2xtp4xmNYnJycRMXiWlNu19UeAzKRwFlOLRSZoRn0WhyCLSxTBWpWg009XFGbKgQYHJDJgK6tGXf4TR22LJ-V3QX5BgiziCOA6DQ=s4800-w400-h400"
      ]
    }
  ];

  it("renders the weather information", () => {
    render(
      <DailyItinerary
        dayNumber={1}
        weather={weatherData}
        attractionsOfTheDay={attractionsOfTheDay}
      />
    );
    expect(screen.getByText(/23°C Sunny/i)).toBeInTheDocument();
  });

  it("should show a placeholder if there is no weather information", () => {
    render(
      <DailyItinerary
        dayNumber={3}
        weather={emptyWeatherData}
        attractionsOfTheDay={attractionsOfTheDay}
      />
    );

    expect(screen.getByText(/Unavailable/i)).toBeInTheDocument();
  });

  it("renders fallback text when there are no attractions", () => {
    render(
      <DailyItinerary
        dayNumber={2}
        weather={weatherData}
        attractionsOfTheDay={[]}
      />
    );

    expect(
      screen.getByText(/There are no attractions for this day!/i)
    ).toBeInTheDocument();
  });

  it("renders TouristAttractionCard for each attraction", () => {
    render(
      <DailyItinerary
        dayNumber={4}
        weather={weatherData}
        attractionsOfTheDay={attractionsOfTheDay}
      />
    );

    expect(screen.getByText("Passeio de Barco (inclui Praia do Farol, Gruta Azul, Fenda de Nossa Senhora)")).toBeInTheDocument();
    expect(screen.getByText("Praia do Forno")).toBeInTheDocument();
  });
});
