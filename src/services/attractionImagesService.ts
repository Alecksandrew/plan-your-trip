import type { photosName } from "@/types/attractionImagesTypes";

///ONLY FETCH ONE IMAGE PER TIME
export default async function fetchAttractionImage(photoID: string) {
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
    const data = await response.json();
    ARRUMAR AQUI!!!!!!============================================================================================================LER COMO O DATA VEM
    return data; 
  } catch (error) {
    console.error("Erro ao buscar dados de imagens:", error);
  }
}
