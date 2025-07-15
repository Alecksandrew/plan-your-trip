import { useEffect, useState } from "react";

import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { FormsState } from "../types/formInterfaces";



///UTILS


type Attractions = {
  title: string;
  description: string;
  openingHours: string;
  images: string[];
};

type DailyItinerary = {
  dayNumber: number;
  attractionsOfTheDay: Attractions[];
  weather: string | { description: string; temperature: number };
};

export type Itinerary = {
  name: string;
  duration: number;
  generalRecommendations: string[];
  fullItinerary: DailyItinerary[];
};

const initialStateForms: FormsState = {
  destination: "",
  date: "",
  budget: "",
  pace: "",
  travelerProfile: "",
  transportation: [],
  style: [],
  interests: [],
};

const initialStateItinerary: Itinerary = {
  name: "",
  duration: 0,
  generalRecommendations: [],
  fullItinerary: [],
};

export default function Home() {
  const [formData, setFormData] = useState<FormsState>(initialStateForms);
  const [itinerary, setItinerary] = useState<Itinerary>(initialStateItinerary);





  return (
    <>
      <div className="text-center custom-section">
        <h1>Descubra seu próximo destino</h1>
        <p className="text-2xl">
          Roteiros personalizados para uma experiência inesquecível
        </p>
      </div>
      <FormSection getFormData={setFormData} />
      <FullItinerary itineraryData={itinerary} />
      <MapsSection />
    </>
  );
}
