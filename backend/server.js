// server.js - Servidor seguro para múltiplas APIs

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServer } from "http";
import { config } from "dotenv";

// Carrega variáveis do .env
config();

// Cria o cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const responseSchema = {
  type: "OBJECT",
  properties: {
    name: {
      type: "STRING",
      description:
        "O nome do destino da viagem, como 'Rio de Janeiro, Brasil'.",
    },
    duration: {
      type: "INTEGER",
      description:
        "A duração total da viagem em dias, calculada a partir das datas.",
    },
    generalRecommendations: {
      type: "ARRAY",
      items: { type: "STRING" },
      description:
        "Uma lista de até 5 dicas e recomendações gerais para a viagem.",
    },
    fullItinerary: {
      type: "ARRAY",
      description:
        "Uma lista de objetos, onde cada objeto representa um dia do roteiro.",
      items: {
        type: "OBJECT",
        properties: {
          dayNumber: {
            type: "INTEGER",
            description: "O número do dia no roteiro, começando por 1.",
          },
          attractionsOfTheDay: {
            type: "ARRAY",
            description: "Uma lista de atrações para este dia específico.",
            items: {
              type: "OBJECT",
              properties: {
                title: {
                  type: "STRING",
                  description:
                    "O nome específico da atração (ex: 'Museu do Amanhã', 'Parque Lage').",
                },
                description: {
                  type: "STRING",
                  description: "Uma descrição concisa e útil da atração.",
                },
                openingHours: {
                  type: "STRING",
                  description:
                    "O horário de funcionamento da atração (ex: '9h às 18h', '24 horas').",
                },
              },
              required: ["title", "description", "openingHours"],
            },
          },
        },
        required: ["dayNumber", "attractionsOfTheDay"],
      },
    },
  },
  required: ["name", "duration", "generalRecommendations", "fullItinerary"],
};

// --- Lógica para o Gemini ---
async function handleGeminiRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { message } = JSON.parse(body);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json", responseSchema: responseSchema },
      });
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, response: text }));
    } catch (error) {
      console.error("Erro ao processar Gemini:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "Erro ao processar requisição do Gemini",
        })
      );
    }
  });
}

async function handleWeatherRequest(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const lat = requestUrl.searchParams.get("lat");
    const lng = requestUrl.searchParams.get("lng");
    const days = requestUrl.searchParams.get("days") || 7; // Pega 7 dias por padrão

    if (!lat || !lng) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "Latitude e Longitude são obrigatórias",
        })
      );
      return;
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    const googleApiUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lng}&days=${days}`;

    const apiResponse = await fetch(googleApiUrl);
    const weatherData = await apiResponse.json();

    if (weatherData.error) {
      console.error(
        "Erro da API do Google Weather:",
        weatherData.error.message
      );
      throw new Error(weatherData.error.message);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, data: weatherData }));
  } catch (error) {
    console.error("Erro ao buscar dados do tempo:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        error: "Erro ao buscar dados do tempo",
        details: error.message,
      })
    );
  }
}

async function handleGeocodingRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { address } = JSON.parse(body);
      if (!address) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ success: false, error: "Endereço não fornecido" })
        );
        return;
      }

      const apiKey = process.env.GOOGLE_API_KEY;

      const params = new URLSearchParams({
        address: address,
        language: "pt-BR", // Pedir resultados em português
        key: apiKey,
      });
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;

      const apiResponse = await fetch(apiUrl);
      const geocodingData = await apiResponse.json();

      if (geocodingData.status !== "OK") {
        throw new Error(
          `API de Geocodificação retornou status: ${geocodingData.status}`
        );
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ success: true, data: geocodingData.results[0] })
      ); // Enviando apenas o primeiro e mais relevante resultado
    } catch (error) {
      console.error("Erro ao buscar dados de geocodificação:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "Erro ao buscar dados de geocodificação",
        })
      );
    }
  });
}

async function handlePlacesSearchRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { textQuery } = JSON.parse(body);
      if (!textQuery) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "textQuery é obrigatório" })
        );
      }

      const apiKey = process.env.GOOGLE_API_KEY;
      const url = "https://places.googleapis.com/v1/places:searchText";

      const requestBody = {
        textQuery: textQuery,
      };

      const apiResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,

          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.photos",
        },
        body: JSON.stringify(requestBody),
      });

      const placesData = await apiResponse.json();

      if (!apiResponse.ok) {
        console.error("Erro da API do Google Places:", placesData);
        throw new Error(
          placesData.error?.message || "Erro desconhecido da API Places"
        );
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, places: placesData.places }));
    } catch (error) {
      console.error("Erro no handlePlacesSearchRequest:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "Erro ao buscar dados de locais",
        })
      );
    }
  });
}

async function handlePlacePhotoRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { photoName, maxWidth = 400, maxHeight = 400 } = JSON.parse(body);

      // Log para depuração
      console.log(`Buscando foto para a referência: ${photoName}`);

      if (!photoName) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, error: "photoName é obrigatório" })
        );
      }

      const apiKey = process.env.GOOGLE_API_KEY;

      const url = `https://places.googleapis.com/v1/${photoName}/media?key=${apiKey}&maxWidthPx=${maxWidth}&maxHeightPx=${maxHeight}&skipHttpRedirect=true`;

      const apiRes = await fetch(url);
      const json = await apiRes.json();

      if (json.error) {
        console.error("Erro da API do Google Places Photo:", json.error);
        throw new Error(json.error.message);
      }

      const photoUri = json.photoUri;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, photoUri: photoUri })); // Corrigido para photoUri: photoUri
    } catch (err) {
      console.error("Erro em handlePlacePhotoRequest:", err.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
}

async function handleRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/gemini" && req.method === "POST") {
    handleGeminiRequest(req, res);
  } else if (req.url.startsWith("/api/weather") && req.method === "GET") {
    handleWeatherRequest(req, res);
  } else if (req.url === "/api/geocoding" && req.method === "POST") {
    handleGeocodingRequest(req, res);
  } else if (req.url === "/api/places-search" && req.method === "POST") {
    handlePlacesSearchRequest(req, res);
  } else if (req.url === "/api/place-photo" && req.method === "POST") {
    handlePlacePhotoRequest(req, res);
  } else {
    res.writeHead(404);
    res.end("Rota não encontrada");
  }
}

const server = createServer(handleRequest);
server.listen(3001, () => {
  console.log("🚀 Servidor rodando em http://localhost:3001");
  console.log(
    "✅ Pronto para receber requisições para: /api/gemini e /api/weather"
  );
});
