//hooks
import useItinerary from "../hooks/useItinerary";
import { useState } from "react";


//components
import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";
import ProgressBar from "../components/ProgressBar";
import Warning from "@/components/Warning";
//types
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
  const { fetchItineraryData, itinerary, loading, error, setError, progress } = useItinerary(formData);


  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>, formData: FormsState) {
    e.preventDefault();
    if(!formData.destination.trim()) return
    if(!formData.date.trim()) return
    fetchItineraryData(formData);
  }


  return (
    <>
      {error && <Warning errorMessage={error} onClick={setError}/>}
      <div className="text-center custom-section mt-0 pt-10">
        <h1>Descubra seu próximo destino</h1>
        <p className="text-2xl">
          Roteiros personalizados para uma experiência inesquecível
        </p>
      </div>
      <FormSection onSubmit={handleFormSubmit} />
      <FullItinerary itineraryData={itinerary} loading={loading} progress={progress} />
      <MapsSection />
    </>
  );
}
