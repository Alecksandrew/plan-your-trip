import DailyItinerary from "./DailyItinerary";

//interfaces
import type { DailyItineraryProps } from "../../sharedInterfaces/DailyItineraryInterface";

interface FullItineraryProps {
    allDaysItinerary: DailyItineraryProps[]
};

export default function FullItinerary({allDaysItinerary}: FullItineraryProps) {
  return (
    <div className="w-9/10 max-w-4xl mx-auto my-6 flex flex-col gap-15">
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
