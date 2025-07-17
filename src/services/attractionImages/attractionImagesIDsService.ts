import type { imagesNameAPIResponse } from "@/types/attractionImagesTypes";
//Get photos IDs of only ONE attraction -> It return about 10 IDs
// Before we get images from google API , we need to fetch the specific name of each image. 
// That is why we have to fetch this before searching for the images

export default async function fetchAttractionImagesIDs(placeName: string):Promise<imagesNameAPIResponse> {
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

        if (!response.ok) {
          throw new Error(
            "Error when fetching attractions images IDs: " + response.statusText
          );
        }

        
        const data = await response.json();
        console.log("TIPO DO FETCHATTRACTIONIMAGESIDS",data)

        return data
      } catch (error) {
        throw new Error("Error when fetching attractions images IDs: " + error);
      }
    }