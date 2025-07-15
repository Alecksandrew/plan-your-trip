import type { imagesNamesBackendResponse } from "@/types/attractionImagesTypes";


 //Filter the IDs to get only the amount you wanna show in the slider
export default function filterAttractionImagesIDs(backendResponse: imagesNamesBackendResponse, amountOfPhotosWanted: number): string[] {
    const amountWanted = backendResponse.data.places[0].photos.slice(0, amountOfPhotosWanted);
    const filteredIDs = amountWanted.map((photo) => photo.name);
    return filteredIDs;
}


