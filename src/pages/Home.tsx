import { useEffect, useState } from "react";

import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { DailyItineraryProps } from "../sharedInterfaces/DailyItineraryInterface";
import type { TouristAttractionCardProps } from "../sharedInterfaces/TouristAttractionInterface";
import type { FormsState } from "../sharedInterfaces/formInterfaces";

interface mockedItinerary {
  name: string;
  roadmap: DailyItineraryProps[];
}

export default function Home() {
  const [ formData, setFormData ] = useState<FormsState>();
  
  useEffect(() => {
    console.log(formData);
    async function fetchTripItineraryData(message) {
    
      const BACKEND_URL: string = "http://localhost:3001";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
      };

      try {
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados do roteiro:", error);
        return null;
      }
    }

    /*fetchTripItineraryData(formData); PARADO POR AGORA*/ 
  }, [formData]);

  //Testing with mocked values
  const mockItinerary: mockedItinerary = {
    name: "Rio de Janeiro",
    roadmap: [
      {
        dayNumber: 1,
        weather: "Ensolarado",
        temperature: 25,
        attractionsOfTheDay: [
          {
            title: "Cristo Redentor",
            description:
              "Um dos maiores símbolos do Rio de Janeiro e do Brasil, com vistas panorâmicas espetaculares da cidade.",
            openingHours: "8h às 19h",
            // Caminho relativo à pasta `src` ou absoluto do seu servidor
            imageUrl: "/src/assets/600x400.svg", // Use o caminho direto ou importe se seu bundler suportar
          } as TouristAttractionCardProps,
          {
            title: "Pão de Açúcar",
            description:
              "Teleférico com vistas incríveis da Baía de Guanabara, praias e cidades vizinhas.",
            openingHours: "8h30 às 20h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
        ],
      },
      {
        dayNumber: 2,
        weather: "Nublado",
        temperature: 20,
        attractionsOfTheDay: [
          {
            title: "Jardim Botânico",
            description:
              "Um oásis verde com rica flora brasileira e estrangeira, incluindo a famosa Alameda das Palmeiras Imperiais.",
            openingHours: "8h às 17h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
          {
            title: "Parque Lage",
            description:
              "Parque público histórico com uma bela mansão, grutas, aquário e trilhas para o Cristo Redentor.",
            openingHours: "8h às 17h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
        ],
      },
    ],
  };

  return (
    <>
      <div className="text-center custom-section">
        <h1>Descubra seu próximo destino</h1>
        <p className="text-2xl">
          Roteiros personalizados para uma experiência inesquecível
        </p>
      </div>
      <FormSection getFormData={setFormData} />
      <FullItinerary
        allDaysItinerary={mockItinerary.roadmap}
        nameItinerary={mockItinerary.name}
      />
      <MapsSection />
    </>
  );
}
