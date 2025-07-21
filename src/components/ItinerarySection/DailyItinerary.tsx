import TouristAttractionCard from "./TouristAttractionCard";

//interfaces
import type { TouristAttractionCardProps } from "../../types/TouristAttractionInterface";
import type { DailyItineraryProps } from "../../types/DailyItineraryInterface";
import type { weather } from "../../types/DailyItineraryInterface";

export default function DailyItinerary({
  dayNumber,
  weather,
  attractionsOfTheDay,
}: DailyItineraryProps) {
  
  function getWeatherText(weatherObject:weather) {
    if(!weatherObject.description && weatherObject.temperature == null) {
      return "Unavailable"
    }

    const description = weatherObject?.description ?? "";
    const temperature = weatherObject?.temperature != null ? `${weatherObject.temperature}°C` : ""
    return `${temperature} ${description}`
  }

  function renderTouristAttractionCard(
    attractions: TouristAttractionCardProps[]
  ) {
    if (!attractions || attractions.length === 0) {
      return (
        <div>
          <p>There are no attractions for this day!</p>
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
    <section className="flex flex-col gap-5 border-2 border-paleta-01 rounded p-3 bg-paleta-03 shadow-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl bg-paleta-01 text-paleta-03 p-1 rounded">
          Dia {dayNumber}
        </h1>
        <div className="text-lg font-medium flex gap-x-2">{getWeatherText(weather)}</div>
      </div>
      {renderTouristAttractionCard(attractionsOfTheDay)}
    </section>
  );
}
