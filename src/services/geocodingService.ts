import { API_BASE_URL } from "@/config/api"

type GeocodingData = {
  data: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
};

export default async function fetchGeocodingData(
  placeName: string
): Promise<GeocodingData | undefined> {
  if (!placeName || typeof placeName !== "string") return;

  const BACKEND_URL: string = `${API_BASE_URL}/api/geocoding`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: placeName }),
  };

  try {
    const response = await fetch(BACKEND_URL, options);

    if (!response.ok) {
      throw new Error(
        "Error when fetching geocoding data: " + response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error when fetching geocoding data:" + error);
  }
}
