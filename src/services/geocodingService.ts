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

  const BACKEND_URL: string = "http://localhost:3001/api/geocoding";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: placeName }),
  };

  try {
    const response = await fetch(BACKEND_URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error when fetching geocoding data:", error);
    return;
  }
}
