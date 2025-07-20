import type { TouristAttractionCardProps } from "./TouristAttractionInterface";



export type weather = {
  description: string;
  temperature: number;
};
export interface DailyItineraryProps {
  dayNumber: number;
  weather: weather;
  attractionsOfTheDay: TouristAttractionCardProps[];
  temperature?: number;
}