import DailyItinerary from "./DailyItinerary";

//interfaces
import type { DailyItineraryProps } from "../sharedInterfaces/DailyItineraryInterface";

interface FullItineraryProps {
    allDaysItinerary: DailyItineraryProps[]
};

export default function FullItinerary({allDaysItinerary}: FullItineraryProps) {
  return (
    <div>
        {
            allDaysItinerary.map((specificItinerary) => {
                return( 
                    <DailyItinerary
                        dayNumber={specificItinerary.dayNumber}
                        weather={specificItinerary.weather}
                        attractionsOfTheDay={specificItinerary.attractionsOfTheDay}
                    />
                );
            })
        }
    </div>
  );
}
