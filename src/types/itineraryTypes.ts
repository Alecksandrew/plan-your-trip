type Attractions = {
  title: string;
  description: string;
  openingHours: string;
};

type DailyItinerary = {
  dayNumber: number;
  attractionsOfTheDay: Attractions[];
};

export type Itinerary = {
  name: string;
  duration: number;
  generalRecommendations: string[];
  fullItinerary: DailyItinerary[];
};



