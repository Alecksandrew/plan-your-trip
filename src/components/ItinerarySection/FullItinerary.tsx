import DailyItinerary from "./DailyItinerary";

//interfaces
import type { DailyItineraryProps } from "../../sharedInterfaces/DailyItineraryInterface";

interface FullItineraryProps {
  allDaysItinerary: DailyItineraryProps[];
  nameItinerary: string;
}

export default function FullItinerary({
  allDaysItinerary,
  nameItinerary,
}: FullItineraryProps) {
  return (
    <div className="custom-section flex flex-col gap-15">
      <div className="text-center">
          <h2>Roteiro: {nameItinerary} - { allDaysItinerary.length} dias</h2>
          {/*-ARRUMAR LOGICA DEPOIS -> objeto com propiedade de nome do itinerario e numero de dias-*/}
          <p>
            Breve descrição{/*-ARRUMAR LOGICA DEPOIS -> objeto com propiedade de breve descrição-*/}
          </p>
      </div>

      {allDaysItinerary.map((specificItinerary) => {
        return (
          <DailyItinerary
            key={specificItinerary.dayNumber}
            dayNumber={specificItinerary.dayNumber}
            weather={specificItinerary.weather}
            temperature={specificItinerary.temperature}
            attractionsOfTheDay={specificItinerary.attractionsOfTheDay}
          />
        );
      })}
    </div>
  );
}
