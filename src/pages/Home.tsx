
import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { DailyItineraryProps } from '../sharedInterfaces/DailyItineraryInterface';
import type { TouristAttractionCardProps } from '../sharedInterfaces/TouristAttractionInterface';

export default function Home() {
 
  //Testing with mocked values
 const mockAllDaysItinerary: DailyItineraryProps[] = [
  {
    dayNumber: 1,
    weather: "Ensolarado",
    attractionsOfTheDay: [
      {
        title: "Cristo Redentor",
        description: "Um dos maiores símbolos do Rio de Janeiro e do Brasil, com vistas panorâmicas espetaculares da cidade.",
        openingHours: "8h às 19h",
        // Caminho relativo à pasta `src` ou absoluto do seu servidor
        imageUrl: "/src/assets/600x400.svg" // Use o caminho direto ou importe se seu bundler suportar
      } as TouristAttractionCardProps,
      {
        title: "Pão de Açúcar",
        description: "Teleférico com vistas incríveis da Baía de Guanabara, praias e cidades vizinhas.",
        openingHours: "8h30 às 20h",
        imageUrl: "/src/assets/600x400.svg"
      } as TouristAttractionCardProps,
    ],
  },
  {
    dayNumber: 2,
    weather: "Nublado",
    attractionsOfTheDay: [
      {
        title: "Jardim Botânico",
        description: "Um oásis verde com rica flora brasileira e estrangeira, incluindo a famosa Alameda das Palmeiras Imperiais.",
        openingHours: "8h às 17h",
        imageUrl: "/src/assets/600x400.svg"
      } as TouristAttractionCardProps,
      {
        title: "Parque Lage",
        description: "Parque público histórico com uma bela mansão, grutas, aquário e trilhas para o Cristo Redentor.",
        openingHours: "8h às 17h",
        imageUrl: "/src/assets/600x400.svg"
      } as TouristAttractionCardProps,
    ],
  },
];
 
 
  return (
    <>
    <div className="text-center custom-section">
      <h1>Descubra seu próximo destino</h1>
      <p className="text-2xl">Roteiros personalizados para uma experiência inesquecível</p>
    </div>
    <FormSection />
    <FullItinerary allDaysItinerary={mockAllDaysItinerary}/>
    <MapsSection />
    </>
  );
}
