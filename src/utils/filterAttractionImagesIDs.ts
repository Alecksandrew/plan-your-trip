import type { imagesNamesBackendResponse } from "@/types/attractionImagesTypes";

export default function filterAttractionImagesIDs(backendResponse: imagesNamesBackendResponse, amountOfPhotosWanted: number): string[] {
    const amountWanted = backendResponse.data.places[0].photos.slice(0, amountOfPhotosWanted);
    const filteredIDs = amountWanted.map((photo) => photo.name);
    return filteredIDs;
}


