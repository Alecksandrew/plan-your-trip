import DailyItinerary from "./DailyItinerary";
import DailyItinerarySkeleton from "./Loader/DailyAttractionSkeleton";

//interfaces
import type { Itinerary } from "../../pages/Home";

interface ItineraryProps {
  itineraryData: Itinerary;
  loading: boolean;
}

export default function FullItinerary({ itineraryData, loading }: ItineraryProps) {

  return (
    <div className="custom-section flex flex-col gap-15">
      <div className="text-center">
        <h2>
          Roteiro: {itineraryData.name} - {itineraryData.duration} dias
        </h2>
        {/*-ARRUMAR LOGICA DEPOIS -> objeto com propiedade de nome do itinerario e numero de dias-*/}
        <p>
          Breve descrição
          {/*-ARRUMAR LOGICA DEPOIS -> objeto com propiedade de breve descrição-*/}
        </p>
      </div>
      { loading && <DailyItinerarySkeleton /> }
      {!loading && itineraryData.fullItinerary.map((specificItinerary) => {
        return (
          <DailyItinerary
            key={specificItinerary.dayNumber}
            dayNumber={specificItinerary.dayNumber}
            weather={
              typeof specificItinerary.weather === "string"
                ? specificItinerary.weather
                : specificItinerary.weather?.temperature + "ºC " +
                  specificItinerary.weather?.description
            }
            attractionsOfTheDay={specificItinerary.attractionsOfTheDay}
          />

        );
      })}
    </div>
  );
}
