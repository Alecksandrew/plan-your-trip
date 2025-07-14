import type { imagesNamesBackendResponse } from "@/types/attractionImagesTypes";

// Before we get images from google API , we need to fetch the specific name of each image. 
// That is why we have to fetch this before searching for the images

export default async function fetchAttractionImagesIDs(placeName: string):Promise<imagesNamesBackendResponse> {
      const BACKEND_URL: string = "http://localhost:3001/api/places-search";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textQuery: placeName }),
      };

      try {
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();

        return data
      } catch (error) {
        throw new Error("Error when fetching attractions images names: " + error);
      }
    }