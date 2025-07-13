import { useEffect, useState } from "react";

import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { FormsState } from "../sharedInterfaces/formInterfaces";

type Attractions = {
  title: string;
  description: string;
  openingHours: string;
  images: string[];
};

type DailyItinerary = {
  dayNumber: number;
  attractionsOfTheDay: Attractions[];
  weather: string | { description: string; temperature: number };
};

export type Itinerary = {
  name: string;
  duration: number;
  generalRecommendations: string[];
  fullItinerary: DailyItinerary[];
};

const initialStateForms: FormsState = {
  destination: "",
  date: "",
  budget: "",
  pace: "",
  travelerProfile: "",
  transportation: [],
  style: [],
  interests: [],
};

const initialStateItinerary: Itinerary = {
  name: "",
  duration: 0,
  generalRecommendations: [],
  fullItinerary: [],
};

export default function Home() {
  const [formData, setFormData] = useState<FormsState>(initialStateForms);
  const [itinerary, setItinerary] = useState<Itinerary>(initialStateItinerary);

  const personalizedPromptAI = `
  # PERSONA
  Você é o "Mestre dos Roteiros", um planejador de viagens com 30 anos de experiência global. Sua especialidade é criar roteiros de viagem hiper-personalizados que transformam uma simples viagem em uma experiência inesquecível. Você conhece não apenas os pontos turísticos famosos, mas também as joias escondidas que só os locais conhecem. Seu objetivo é a excelência e a personalização máxima.

  # TAREFA
  Sua única tarefa é analisar um objeto JSON contendo as preferências de um cliente e, a partir dessa análise, gerar um roteiro de viagem detalhado, retornando a resposta como uma string JSON pura.

  # REGRAS DE ANÁLISE E LÓGICA
  Você deve seguir estas regras lógicas para construir o roteiro:
  1.  **Cálculo da Duração**: Calcule o número de dias da viagem com base no campo "date" do JSON de entrada. Este será o valor do campo "duration".
  2.  **Orçamento (budget)**: Adapte as sugestões de atividades ao orçamento. "Moderado" significa uma mistura de atividades pagas e gratuitas. "Econômico" deve focar em atividades gratuitas ou de baixo custo. "Luxo" pode incluir experiências exclusivas.
  3.  **Ritmo (pace)**: Ajuste a quantidade de atividades por dia. "Intenso" significa 3-4 atividades. "Moderado" significa 2-3 atividades. "Relaxado" significa 1-2 atividades.
  4.  **Perfil (travelerProfile)**: Personalize o tipo de atividade para o perfil (solo, casal, família).
  5.  **Interesses e Estilo (interests, style)**: Use os interesses como o principal guia para selecionar as atrações.
  6.  **Otimização de Transporte (transportation)**: Se for "Transporte público", agrupe as atividades de cada dia por proximidade geográfica para otimizar o deslocamento.
  7.  **Restrição Geográfica**: Todas as atividades e locais sugeridos DEVEM estar localizados dentro da cidade principal ("destination") ou em suas imediações imediatas e de fácil acesso (ex: Niterói para o Rio de Janeiro, Versalhes para Paris). Não sugira viagens de um dia para cidades distantes.
  8.  **Descrição e Detalhes**: As descrições das atrações devem ser úteis e concisas. O campo "openingHours" deve ser preenchido com os horários reais de funcionamento da atração. NÃO inclua um campo de imagem.
  9.  **Geração de Recomendações Gerais**: No nível raiz do JSON de saída, adicione à propriedade chamada generalRecommendations. Esta propriedade deve ser um array contendo no máximo 5 strings. Cada string deve ser uma dica geral útil para a viagem, baseada nos dados de entrada. Considere os seguintes tópicos para as dicas:
      * **Sazonalidade**: Analise a data da viagem. É alta ou baixa temporada? Chove muito nessa época?
      * **Nível de Lotação**: Com base na sazonalidade, informe se os locais turísticos estarão mais cheios ou mais vazios.
      * **Eventos ou Feriados**: Verifique se as datas coincidem com feriados locais ou eventos importantes que possam impactar a viagem.
      * **Dicas Culturais**: Forneça uma dica de etiqueta ou costume local (ex: gorjetas, cumprimentos).
      * **Gastronomia**: Sugira um prato ou bebida local que o viajante não pode deixar de experimentar.
      * **Segurança**: Ofereça uma dica de segurança geral e relevante para o destino.

  # REGRAS DE SAÍDA (MUITO IMPORTANTE)
  Sua resposta deve ser **APENAS E SOMENTE** uma string JSON válida.
  -   **NÃO** inclua nenhum texto antes ou depois do JSON.
  -   **NÃO** use blocos de código como \`\`\`json.
  -   **NÃO** adicione explicações, saudações ou comentários.
  -   O JSON de saída deve seguir **RIGOROSAMENTE** a estrutura de dados fornecida no exemplo abaixo.

  ### Exemplo da Estrutura de Saída Esperada:
  {
      "name": "Nome do Destino",
      "duration": 3,
      "generalRecommendations": [
          "Dica sobre a lotação da cidade na época da viagem.",
          "Dica cultural sobre costumes locais, como gorjetas.",
          "Sugestão de um prato típico que você não pode deixar de provar."
      ],
      "fullItinerary": [
          {
              "dayNumber": 1,
              "attractionsOfTheDay": [
                  {
                      "title": "Nome da Atração 1",
                      "description": "Descrição da Atração 1.",
                      "openingHours": "8h às 19h"
                  },
                  {
                      "title": "Nome da Atração 2",
                      "description": "Descrição da Atração 2.",
                      "openingHours": "9h às 17h"
                  }
              ]
          }
      ]
  }

  # DADOS DO CLIENTE PARA ESTA SOLICITAÇÃO:
`;

  useEffect(() => {
    if (!formData.destination || !formData.date) return;
    console.log(formData);

    /*========HANDLE WITH WEATHER DATA========*/
    function isThereForecastAvailable() {
      //API only shows forecast for 10 days
      if (!formData) return false;

      const dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0);

      const endDate = formData.date.split(" - ")[1];

      const [day, month, year] = endDate.split("/");

      const endDateObject = new Date(+year, +month - 1, +day);

      const differenceInMiliseconds =
        endDateObject.getTime() - dateNow.getTime();
      const differenceInDays = Math.ceil(
        differenceInMiliseconds / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays <= 0) {
        return false;
      } else if (differenceInDays > 10) {
        return false;
      } else {
        return differenceInDays;
      }
    }

    //Calculate if the user start the trip today or in some days
    function calculateDaysOffset(startDate) {
      const dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0);

      const [day, month, year] = startDate.split("/");

      const startDateObject = new Date(+year, +month - 1, +day);

      const differenceInMiliseconds =
        startDateObject.getTime() - dateNow.getTime();
      const daysOffset = Math.ceil(
        differenceInMiliseconds / (1000 * 60 * 60 * 24)
      );

      return daysOffset;
    }

    async function fetchGeocodingData(placeName: string) {
      if (!formData) return;

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
        console.log(data);
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados de geocodificação:", error);
      }
    }

    async function fetchWeatherData() {
      if (!isThereForecastAvailable()) return;
      const daysToFetchForecast = isThereForecastAvailable();

      const geocodingData = await fetchGeocodingData(formData.destination);

      type Location = {
        lat: number;
        lng: number;
      };

      const location: Location = geocodingData.data?.geometry?.location;
      if (!location) {
        console.error(
          "Erro ao buscar dados de geocodificação: Localização não encontrada"
        );
        return;
      }

      const weatherParams = new URLSearchParams({
        lat: location.lat.toString(),
        lng: location.lng.toString(),
        days: daysToFetchForecast.toString(),
      });

      const BACKEND_URL: string = `http://localhost:3001/api/weather?${weatherParams}`;

      try {
        //I ONLY NEED THE WEATHER CONDITION OF EACH DAY
        //API TYPE
        type Description = {
          text: string;
        };

        type WeatherCondition = {
          description: Description;
        };

        type Temperature = {
          degrees: number;
        };

        type DayForecast = {
          weatherCondition: WeatherCondition;
        };

        type ForecastDays = {
          daytimeForecast: DayForecast;
          maxTemperature: Temperature;
          minTemperature: Temperature;
        };

        type data2 = {
          forecastDays: ForecastDays[];
        };

        type data1 = {
          data: data2;
        };

        const response = await fetch(BACKEND_URL);
        const data: data1 = await response.json();
        console.log(data);

        //Calculate if the user start the trip today or in some days
        const startDate = formData.date.split(" - ")[0];
        const daysOffset = calculateDaysOffset(startDate);

        const relevantForecast = data.data.forecastDays
          .slice(daysOffset - 1)
          .map((day) => {
            const weather = {
              description:
                day.daytimeForecast?.weatherCondition?.description?.text,
              temperature: Math.round(
                (day.maxTemperature?.degrees + day.minTemperature?.degrees) / 2
              ), // Average temperature in Celsius
            };
            return weather;
          });

        console.log(relevantForecast);
        return relevantForecast;
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error);
      } finally {
        console.log("Finalizando busca de dados do tempo");
      }
    }

    /*========HANDLE WITH AI ITINERARY DATA========*/

    async function fetchTripItineraryData(
      message: string
    ): Promise<Itinerary | null> {
      const BACKEND_URL: string = "http://localhost:3001/api/gemini";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      };

      try {
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();
        console.log(data);
        return JSON.parse(data.response);
      } catch (error) {
        console.error("Erro ao buscar dados do roteiro:", error);
        return null;
      }
    }

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
        console.log(photos)
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

        console.log("ESTE É O ATTRACTIONIMAGENAME", attractionsImagesNames)

        const attractionImages = attractionsImagesNames.map( async (name) => {
          const fetchedImages = await fetchAttractionsImages(name[0] /*INDEX ZERO BECAUSE IT IS THE MAIN PHOTO*/ )
          console.log(fetchedImages)
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

        fetchAttractionsImages(comprehensiveItinerary.fullItinerary[0].attractionsOfTheDay[0].photos[0]);
        console.log(comprehensiveItinerary);
        setItinerary(comprehensiveItinerary);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
    /*fetchTripItineraryData(formData); PARADO POR AGORA*/
    /*========AFTER RETURN ITINERARY DATA, ITERATE EACH ELEMENT OF FULLITINERARY AND ADD WEATHER PROPRETY========*/
  }, [formData]);

  return (
    <>
      <div className="text-center custom-section">
        <h1>Descubra seu próximo destino</h1>
        <p className="text-2xl">
          Roteiros personalizados para uma experiência inesquecível
        </p>
      </div>
      <FormSection getFormData={setFormData} />
      <FullItinerary itineraryData={itinerary} />
      <MapsSection />
    </>
  );
}
