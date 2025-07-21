//
import { useState, useEffect } from "react";

import DailyItinerary from "./DailyItinerary";
import DailyItinerarySkeleton from "./Loader/DailyAttractionSkeleton";
import ProgressBar from "../ProgressBar";

//interfaces
import type { Itinerary } from "@/types/itineraryTypes";

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
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setDelayedLoading(loading);
    } else {
      //Only delay in the end of animation
      const timer = setTimeout(() => {
        setDelayedLoading(loading);
      }, 1000); //Delay in order to let the ProgressBar finish its animation

      return () => clearTimeout(timer);
    }
  }, [loading]);

  function renderGeneralRecomendations() {
    return itineraryData.generalRecommendations.map((recomendation) => {
      return (
        <li key={recomendation} className="text-left mb-4 leading-tight ">
          {recomendation}
        </li>
      );
    });
  }

  const name = itineraryData?.name || "";
  const duration = itineraryData?.duration || 0;
  const fullItinerary = itineraryData?.fullItinerary || [];

  return (
    <section className="custom-section flex flex-col gap-5">
      <div className="text-center">
        <h2>
          Roteiro: {name} - {duration} dias
        </h2>
      </div>
      {delayedLoading && (
        <div>
          <div className="flex flex-col gap-2 mb-8">
            <p className="mx-auto font-bold">
              Aguarde, estamos criando seu roteiro! :)
            </p>
            <ProgressBar progress={progress} />
          </div>
          <DailyItinerarySkeleton />
        </div>
      )}
      {!delayedLoading &&
        fullItinerary.length > 0 &&
        fullItinerary.map((specificItinerary) => {
          return (
            <DailyItinerary
              key={specificItinerary.dayNumber}
              dayNumber={specificItinerary.dayNumber}
              weather={specificItinerary.weather}
              attractionsOfTheDay={specificItinerary.attractionsOfTheDay}
            />
          );
        })}

      {!delayedLoading && fullItinerary.length === 0 && (
        <div className="text-center text-gray-500">
          <p>Nenhum itinerário disponível</p>
        </div>
      )}
      <div className="custom-section text-center bg-paleta-03 rounded w-full border-paleta-01 border-2 p-2 shadow-xl">
        <h2 className="mb-4">Recomendações gerais</h2>
        {!delayedLoading && fullItinerary.length > 0 && (
          <ol className="w-4/5 min-w-75 mx-auto list-decimal">
            {renderGeneralRecomendations()}
          </ol>
        )}

        {!delayedLoading && fullItinerary.length === 0 && (
          <p>Nenhuma recomendação disponível</p>
      )}
      </div>
    </section>
  );
}
