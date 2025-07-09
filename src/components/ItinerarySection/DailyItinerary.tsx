import TouristAttractionCard from "./TouristAttractionCard";

//interfaces
import type { TouristAttractionCardProps } from "../../sharedInterfaces/TouristAttractionInterface";
import type { DailyItineraryProps } from "../../sharedInterfaces/DailyItineraryInterface";

export default function DailyItinerary({
  dayNumber,
  weather,
  attractionsOfTheDay,
}: DailyItineraryProps) {
  const weatherIcon = {
    Ensolarado: 1, //Icone de sol;
    Nublado: 1, //Icone de nuvem;
    Chuvoso: 1, //Icone de chuva;
    Tempestuoso: 1, //Icone de tempestade;
  };

  function renderTouristAttractionCard(
    attractions: TouristAttractionCardProps[]
  ) {
    if (!attractions || attractions.length === 0) {
      return (
        <div>
          <p>Nenhuma atração para este dia</p>
        </div>
      );
    }

    return attractions.map((attraction) => {
      return (
        <TouristAttractionCard
          key={attraction.title}
          title={attraction.title}
          description={attraction.description}
          openingHours={attraction.openingHours}
        />
      );
    });
  }

  return (
    <>
      <div>
        <h1>Dia {dayNumber}</h1>
        <div>{weather}</div>
      </div>
      {renderTouristAttractionCard(attractionsOfTheDay)}
    </>
  );
}
