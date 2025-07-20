//
import { useState, useEffect } from "react";

import DailyItinerary from "./DailyItinerary";
import DailyItinerarySkeleton from "./Loader/DailyAttractionSkeleton";
import ProgressBar from "../ProgressBar";

//interfaces
import type { Itinerary } from "../../pages/Home";

interface ItineraryProps {
  itineraryData: Itinerary;
  loading: boolean;
  progress: `${number}%`;
}

export default function FullItinerary({
  itineraryData,
  loading,
  progress,
}: ItineraryProps) {
  const [ delayedLoading, setDelayedLoading ] = useState(false);

  useEffect(() => {
      
    if (loading) {
      setDelayedLoading(loading);
    }
    else { //Only delay in the end of animation
       const timer = setTimeout(() => {
        setDelayedLoading(loading);
      }, 1000); //Delay in order to let the ProgressBar finish its animation

      return () => clearTimeout(timer);
    }
   
    }, [loading]);


  return (
    <div className="custom-section flex flex-col gap-5">
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
      {delayedLoading && (
        <div>
          <div className="flex flex-col gap-2 mb-8">
            <p className="mx-auto font-bold">Wait, we are creating your itinerary! :)</p>
            <ProgressBar progress={progress} />
          </div>
          <DailyItinerarySkeleton />
        </div>
      )}
      {!delayedLoading &&
        itineraryData.fullItinerary.map((specificItinerary) => {
          return (
            <DailyItinerary
              key={specificItinerary.dayNumber}
              dayNumber={specificItinerary.dayNumber}
              weather={specificItinerary.weather}
              attractionsOfTheDay={specificItinerary.attractionsOfTheDay}
            />
          );
        })}
    </div>
  );
}
