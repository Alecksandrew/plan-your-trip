import type { TouristAttractionCardProps } from "./TouristAttractionInterface";

export interface DailyItineraryProps {
  dayNumber: number;
  weather: string;
  attractionsOfTheDay: TouristAttractionCardProps[];
}