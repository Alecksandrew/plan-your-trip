import type { FormsState } from "@/types/formInterfaces";
import type { Itinerary } from "@/types/itineraryTypes";

export default async function fetchTripItineraryData(
  promptAI: string,
  formData: FormsState
): Promise<Itinerary> {
  const message = promptAI + JSON.stringify(formData);

  const BACKEND_URL: string = "http://localhost:3001/api/gemini";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  };

  try {
    const response = await fetch(BACKEND_URL, options);

    if (!response.ok) {
      throw new Error(
        "Error when fetching trip itinerary data: " + response.statusText
      );
    }

    const data = await response.json();

    if (!data?.response) {
      throw new Error(
        "Error when fetching trip itinerary data: No response from backend Gemini"
      );
    }

    return JSON.parse(data.response);
  } catch (error) {
    throw new Error("Error when fetching trip itinerary data: " + error);
  }
}
