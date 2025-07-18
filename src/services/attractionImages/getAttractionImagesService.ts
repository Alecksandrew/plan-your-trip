import fetchAttractionImagesIDs from "@/services/attractionImages/attractionImagesIDsService";
import fetchAttractionImage from "@/services/attractionImages/attractionImagesService";
import filterAttractionImagesIDs from "@/utils/filterAttractionImagesIDs";

// THE ONLY GOAL OF THIS FUNCTION IS TO SIMPLIFY THE LOGIC WHEN FETCHING IMAGES FROM API
// WE HAVE BASICALLY TO FETCH PHOTOS IDS, THEN FILTER HOW MANY PHOTOS WE WANT AND THEN FETCH THE REAL IMAGES
// THIS ONLY GET IMAGES FOR ONLY ONE ATTRACTION

export default async function getAttractionImages(
  placeName: string,
  amountOfImages: number
): Promise<string[]> {
  try {
    //Get photos IDs of only ONE attraction -> It return about 10 IDs
    const attractionImagesIDs = await fetchAttractionImagesIDs(placeName);
    if (!attractionImagesIDs || attractionImagesIDs.places?.[0]?.photos?.length === 0) return ["@/assets/placeholder-image.png"];

    //Filter the IDs to get only 3 and show in the slider
    const filteredAttractionIDs = filterAttractionImagesIDs(
      attractionImagesIDs,
      amountOfImages
    ); // return e.g ["photoID1", "photoID2", "photoID3"]

    //fetch the image of each ID
    const attractionImages = await Promise.all(
      filteredAttractionIDs.map((id) => fetchAttractionImage(id))
    ); // return e.g ["photoURL1", "photoURL2", "photoURL3"]

    return attractionImages;
  } catch {
    return ["@/assets/placeholder-image.png"];
  }
}
