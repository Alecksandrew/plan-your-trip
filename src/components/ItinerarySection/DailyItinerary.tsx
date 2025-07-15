import TouristAttractionCard from "./TouristAttractionCard";

//interfaces
import type { TouristAttractionCardProps } from "../../types/TouristAttractionInterface";
import type { DailyItineraryProps } from "../../types/DailyItineraryInterface";

export default function DailyItinerary({
  dayNumber,
  weather,
  attractionsOfTheDay,
}: DailyItineraryProps) {

  
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
      console.log(attraction.photos);
      return (
        <TouristAttractionCard
          key={attraction.title}
          title={attraction.title}
          description={attraction.description}
          openingHours={attraction.openingHours}
          photos={attraction.photos}
        />
      );
    });
  }

  return (
    <div className="flex flex-col gap-5 border-2 border-paleta-01 rounded p-3 bg-paleta-03 shadow-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl bg-paleta-01 text-paleta-03 p-1 rounded" >Dia {dayNumber}</h1>
        <div className="text-lg font-medium flex gap-x-2">{weather}</div>
      </div>
      {renderTouristAttractionCard(attractionsOfTheDay)}
    </div>
  );
}
