type imagesNamesBackendResponse = {
    photoUri: {
      photoUri: string;
    };
  };

///USE THE PHOTOID TO ONLY FETCH ONE IMAGE PER TIME
export default async function fetchAttractionImage(photoID: string):Promise<string> {
  const BACKEND_URL: string = "http://localhost:3001/api/place-photo";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photoName: photoID }),
  };

  try {
    const response = await fetch(BACKEND_URL, options);
    const data:imagesNamesBackendResponse = await response.json();
    const photoURL = data.photoUri;
    return photoURL;
  } catch (error) {
    throw new Error("Error when fetching attraction image: " + error);
  }
}
