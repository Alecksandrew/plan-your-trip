//hooks
import useItinerary from "../hooks/useItinerary";
import { useState, useRef, useEffect } from "react";


//components
import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";
import Warning from "@/components/Warning";
//types
import type { FormsState } from "../types/formInterfaces";

//CountDown -> I will learn backend to make a better countDown
const SEARCH_COUNT_KEY = 'searchCounter';
const EXPIRATION_TIMESTAMP_KEY = 'searchExpirationTimestamp';
const SEARCH_LIMIT = 5; 


export default function Home() {
  const { fetchItineraryData, itinerary, loading, error, setError, progress } = useItinerary();
  const [unlockMessage, setUnlockMessage] = useState<string | null>(null)

  useEffect(() => {
    //Block when the user fetch many itineraries
    const expirationTimestampStr = localStorage.getItem(EXPIRATION_TIMESTAMP_KEY);
    if (expirationTimestampStr) {
      const expirationTimestamp = parseInt(expirationTimestampStr, 10);

      if (Date.now() < expirationTimestamp) {
        const expirationDate = new Date(expirationTimestamp);
        const hours = expirationDate.getHours().toString().padStart(2, '0');
        const minutes = expirationDate.getMinutes().toString().padStart(2, '0');
        setUnlockMessage(`Você atingiu o limite de buscas. Tente novamente amanhã, a partir das ${hours}:${minutes}. Se o aviso persistir mesmo após o horário, recarregue a página!`);
      } else {
        localStorage.removeItem(EXPIRATION_TIMESTAMP_KEY);
        localStorage.removeItem(SEARCH_COUNT_KEY);
        setUnlockMessage(null);
      }
    }
  }, []);


  const itineraryRef = useRef<HTMLDivElement>(null);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>, formData: FormsState) {
    e.preventDefault();
    if (!formData.destination.trim() || !formData.date.trim()) return;


    if (unlockMessage) {
      setError(unlockMessage);
      return;
    }
    
    const currentCount = parseInt(localStorage.getItem(SEARCH_COUNT_KEY) || '0', 10);
    const newCount = currentCount + 1;

    fetchItineraryData(formData);
    localStorage.setItem(SEARCH_COUNT_KEY, newCount.toString());
    

    itineraryRef.current?.scrollIntoView({ behavior: "smooth" });


    if (newCount >= SEARCH_LIMIT) {
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
      const expirationTimestamp = Date.now() + twentyFourHoursInMs;
      localStorage.setItem(EXPIRATION_TIMESTAMP_KEY, expirationTimestamp.toString());
      

      const expirationDate = new Date(expirationTimestamp);
      const hours = expirationDate.getHours().toString().padStart(2, '0');
      const minutes = expirationDate.getMinutes().toString().padStart(2, '0');
      const message = `Você atingiu o limite de buscas. Tente novamente amanhã, a partir das ${hours}:${minutes}. Se o aviso persistir mesmo após o horário, recarregue a página!`;
      setUnlockMessage(message);
      setError(message);
  }
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
      <span ref={itineraryRef}>
        <FullItinerary itineraryData={itinerary} loading={loading} progress={progress} />
      </span>
      <MapsSection />
    </>
  );
}

