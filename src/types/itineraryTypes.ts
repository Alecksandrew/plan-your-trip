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



