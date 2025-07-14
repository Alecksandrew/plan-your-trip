import { useEffect, useState } from "react";

//Utils
import checkForecastAvailability  from "@/utils/checkForecastAvailability";
import calculateDaysOffset from "@/utils/calculateDaysOffset";

//services
import fetchGeocodingData from "@/services/geocodingService";
import fetchWeatherData from "@/services/weatherService";
import fetchTripItineraryData from "@/services/tripItineraryService";


function useItinerary() {
  
  
  
  
  
    useEffect(() => {
    if (!formData.destination || !formData.date) return;
    console.log(formData);

    
    
    /*========HANDLE WITH WEATHER DATA========*/
    const dateRange = formData.date;
    checkForecastAvailability(dateRange);

    const startDate = dateRange.split(" - ")[0];
    const daysOffset = calculateDaysOffset(startDate);

   
    fetchGeocodingData(placeName)
    fetchWeatherData(placeName, DateRange)
   
    /*========HANDLE WITH AI ITINERARY DATA========*/

    const itineraryData = fetchTripItineraryData(personalizedPromptAI, formData);

    /*=======HANDLE WITH IMAGE OF ATRACTIONS========*/

    async function fetchAttractionsImagesNames(query) {
      const BACKEND_URL: string = "http://localhost:3001/api/places-search";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textQuery: query }),
      };

      try {
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados de imagens:", error);
      }
    }

    async function fetchAttractionsImages(photos) {
      const BACKEND_URL: string = "http://localhost:3001/api/place-photo";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoName: photos }),
      };

      try {
        console.log(photos);
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();
        console.log("ISSO DEVERIA CONTER URL CORRETO:", data);
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados de imagens:", error);
      }
    }

    /*========RUNNING FUNCTIONS========*/
    Promise.all([
      fetchWeatherData(),
      fetchTripItineraryData(personalizedPromptAI + JSON.stringify(formData)),
    ])
      .then(async (values) => {
        const [dailyForecast, itinerary] = values;
        console.log(itinerary);
        if (!itinerary) return;

        //Fetch image of each attraction
        const dailyItinerary = itinerary.fullItinerary;

        const attractionsNames = dailyItinerary.flatMap((day) =>
          day.attractionsOfTheDay.map((attraction) => attraction.title)
        );

        const fetchToGetAttractionImagesNames = await Promise.all(
          attractionsNames.map((attraction) =>
            fetchAttractionsImagesNames(attraction)
          )
        );

        //Array and in each index, there is a array of photos of each attraction
        const attractionsImagesNames = fetchToGetAttractionImagesNames.map(
          (obj) => obj.places[0].photos.map((photo) => photo.name)
        );

        console.log("ESTE É O ATTRACTIONIMAGENAME", attractionsImagesNames);

        const attractionImages = attractionsImagesNames.map(async (name) => {
          const fetchedImages = await fetchAttractionsImages(
            name[0] /*INDEX ZERO BECAUSE IT IS THE MAIN PHOTO*/
          );
          console.log(fetchedImages);
          return fetchedImages;
        });

        const photoMap = new Map();

        //Map with the name of the attraction and the array of photos
        attractionsNames.forEach((name, index) => {
          photoMap.set(name, attractionsImagesNames[index]);
        });

        //Put together all data
        const comprehensiveItinerary = {
          ...itinerary,
          fullItinerary: dailyItinerary.map((day, index) => {
            //Putting images in each attraction
            const attractionsWithImages = day.attractionsOfTheDay.map(
              (attraction) => {
                const photos = photoMap.get(attraction.title);
                return { ...attraction, photos };
              }
            );

            //Putting weather in each day
            return {
              ...day,
              attractionsOfTheDay: attractionsWithImages,
              weather: dailyForecast?.[index] || "Unknown",
            };
          }),
        };

        fetchAttractionsImages(
          comprehensiveItinerary.fullItinerary[0].attractionsOfTheDay[0]
            .photos[0]
        );
        console.log(comprehensiveItinerary);
        setItinerary(comprehensiveItinerary);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
    /*fetchTripItineraryData(formData); PARADO POR AGORA*/
    /*========AFTER RETURN ITINERARY DATA, ITERATE EACH ELEMENT OF FULLITINERARY AND ADD WEATHER PROPRETY========*/
  }, [formData]);
}
