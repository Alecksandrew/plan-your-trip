import { useEffect, useState } from "react";

import FormSection from "../components/FormsSection/FormSection";
import FullItinerary from "../components/ItinerarySection/FullItinerary";
import MapsSection from "../components/MapsSection/MapsSection";

import type { DailyItineraryProps } from "../sharedInterfaces/DailyItineraryInterface";
import type { TouristAttractionCardProps } from "../sharedInterfaces/TouristAttractionInterface";
import type { FormsState } from "../sharedInterfaces/formInterfaces";

interface mockedItinerary {
  name: string;
  roadmap: DailyItineraryProps[];
}

export default function Home() {
  const [formData, setFormData] = useState<FormsState>();

  const personalizedPromptAI = `
  # PERSONA
  Você é o "Mestre dos Roteiros", um planejador de viagens com 30 anos de experiência global. Sua especialidade é criar roteiros de viagem hiper-personalizados que transformam uma simples viagem em uma experiência inesquecível. Você conhece não apenas os pontos turísticos famosos, mas também as joias escondidas que só os locais conhecem. Seu objetivo é a excelência e a personalização máxima.

  # TAREFA
  Sua única tarefa é analisar um objeto JSON contendo as preferências de um cliente e, a partir dessa análise, gerar um roteiro de viagem detalhado, retornando a resposta como uma string JSON pura.

  # REGRAS DE ANÁLISE E LÓGICA
  Você deve seguir estas regras lógicas para construir o roteiro:
  1.  **Cálculo da Duração**: Calcule o número de dias da viagem com base no campo "date" do JSON de entrada. Este será o valor do campo "duration".
  2.  **Orçamento (\`budget\`)**: Adapte as sugestões de atividades ao orçamento. "Moderado" significa uma mistura de atividades pagas e gratuitas. "Econômico" deve focar em atividades gratuitas ou de baixo custo. "Luxo" pode incluir experiências exclusivas.
  3.  **Ritmo (\`pace\`)**: Ajuste a quantidade de atividades por dia. "Intenso" significa 3-4 atividades. "Moderado" significa 2-3 atividades. "Relaxado" significa 1-2 atividades.
  4.  **Perfil (\`travelerProfile\`)**: Personalize o tipo de atividade para o perfil (solo, casal, família).
  5.  **Interesses e Estilo (\`interests\`, \`style\`)**: Use os interesses como o principal guia para selecionar as atrações.
  6.  **Otimização de Transporte (\`transportation\`)**: Se for "Transporte público", agrupe as atividades de cada dia por proximidade geográfica para otimizar o deslocamento.
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
      "FullItinerary": [
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
    if(!formData) return;
    console.log(formData);

    function isThereForecastAvailable() {
      //API only shows forecast for 10 days
      if(!formData) return false;

      const dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0);

      const endDate = formData.date.split(" - ")[1];

      const [day, month, year] = endDate.split("/");
      
      const endDateObject = new Date(+day, +month - 1, +year);

      const differenceInMiliseconds = endDateObject.getTime() - dateNow.getTime();
      const differenceInDays = Math.ceil(
        differenceInMiliseconds / (1000 * 60 * 60 * 24)
      );

      return 10 >= differenceInDays && differenceInDays > 0;
    }

    async function fetchGeocodingData(placeName:string) {
      if(!formData) return;

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
        return response.json();
      }
      catch(error) {
        console.error("Erro ao buscar dados de geocodificação:", error);
      }
    }

    async function fetchWeatherData() {
      if(!isThereForecastAvailable()) return;

      const geocodingData = await fetchGeocodingData(formData.destination)

      const BACKEND_URL: string = "http://localhost:3001/weather";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: geocodingData.results[0].geometry.location }),
      };

      try {
        const response = await fetch(BACKEND_URL, options);
        const data = await response.json();

      }
      catch(error) {
        console.error("Erro ao buscar dados do tempo:", error);
      }
    }

    async function fetchTripItineraryData(message: string): FormsState | null {
      const BACKEND_URL: string = "http://localhost:3001/gemini";
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
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados do roteiro:", error);
        return null;
      }
    }


    const responseTest = fetchGeocodingData(formData.destination);
    console.log(responseTest);
    /*fetchTripItineraryData(formData); PARADO POR AGORA*/
  }, [formData]);

  //Testing with mocked values
  const mockItinerary: mockedItinerary = {
    name: "Rio de Janeiro",
    roadmap: [
      {
        dayNumber: 1,
        weather: "Ensolarado",
        temperature: 25,
        attractionsOfTheDay: [
          {
            title: "Cristo Redentor",
            description:
              "Um dos maiores símbolos do Rio de Janeiro e do Brasil, com vistas panorâmicas espetaculares da cidade.",
            openingHours: "8h às 19h",
            // Caminho relativo à pasta `src` ou absoluto do seu servidor
            imageUrl: "/src/assets/600x400.svg", // Use o caminho direto ou importe se seu bundler suportar
          } as TouristAttractionCardProps,
          {
            title: "Pão de Açúcar",
            description:
              "Teleférico com vistas incríveis da Baía de Guanabara, praias e cidades vizinhas.",
            openingHours: "8h30 às 20h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
        ],
      },
      {
        dayNumber: 2,
        weather: "Nublado",
        temperature: 20,
        attractionsOfTheDay: [
          {
            title: "Jardim Botânico",
            description:
              "Um oásis verde com rica flora brasileira e estrangeira, incluindo a famosa Alameda das Palmeiras Imperiais.",
            openingHours: "8h às 17h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
          {
            title: "Parque Lage",
            description:
              "Parque público histórico com uma bela mansão, grutas, aquário e trilhas para o Cristo Redentor.",
            openingHours: "8h às 17h",
            imageUrl: "/src/assets/600x400.svg",
          } as TouristAttractionCardProps,
        ],
      },
    ],
  };

  return (
    <>
      <div className="text-center custom-section">
        <h1>Descubra seu próximo destino</h1>
        <p className="text-2xl">
          Roteiros personalizados para uma experiência inesquecível
        </p>
      </div>
      <FormSection getFormData={setFormData} />
      <FullItinerary
        allDaysItinerary={mockItinerary.roadmap}
        nameItinerary={mockItinerary.name}
      />
      <MapsSection />
    </>
  );
}
