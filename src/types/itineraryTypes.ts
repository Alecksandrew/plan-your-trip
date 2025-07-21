export type Weather = {
  description: string,
  temperature: number | null,
}



export type Attractions = {
  title: string;
  description: string;
  openingHours: string;
  photos?: string[];
};

export type DailyItinerary = {
  dayNumber: number;
  attractionsOfTheDay: Attractions[];
  weather?:Weather;
};

export type Itinerary = {
  name: string;
  duration: number;
  generalRecommendations: string[];
  fullItinerary: DailyItinerary[];
};



