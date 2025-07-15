import { useEffect, useState } from "react";

import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { FormsState } from "../types/formInterfaces";



///UTILS
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

export default function Home() {
  const [formData, setFormData] = useState<FormsState>(initialStateForms);





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
