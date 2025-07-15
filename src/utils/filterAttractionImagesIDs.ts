type PlacesSearchResponse = {
  success: boolean;
  places: {
    photos: {
      name: string;
    }[];
  }[];
}


 //Filter the IDs to get only the amount you wanna show in the slider
export default function filterAttractionImagesIDs(backendResponse: PlacesSearchResponse, amountOfPhotosWanted: number): string[] {
    const amountWanted = backendResponse.places[0].photos.slice(0, amountOfPhotosWanted);
    const filteredIDs = amountWanted.map((photo) => photo.name);
    return filteredIDs;
}


