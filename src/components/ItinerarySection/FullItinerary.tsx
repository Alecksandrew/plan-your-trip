import DailyItinerary from "./DailyItinerary";

//interfaces
import type { DailyItineraryProps } from "../../sharedInterfaces/DailyItineraryInterface";

interface FullItineraryProps {
    allDaysItinerary: DailyItineraryProps[]
};

export default function FullItinerary({allDaysItinerary}: FullItineraryProps) {
  return (
    <div className="custom-section flex flex-col gap-15">
        {
            allDaysItinerary.map((specificItinerary) => {
                return( 
                    <DailyItinerary
                        key={specificItinerary.dayNumber}
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
