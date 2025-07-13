// server.js - Servidor seguro para múltiplas APIs

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServer } from "http";
import { config } from "dotenv";
// A API fetch já vem integrada no Node.js a partir da v18.
// Ela é ótima para fazer requisições para outras APIs do seu backend.
// É a mesma 'fetch' que você usa no front-end!

// Carrega variáveis do .env
config();

// Cria o cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- Lógica para o Gemini ---
async function handleGeminiRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { message } = JSON.parse(body);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Usei 1.5-flash, um modelo comum
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
    // A API do Google usa GET, então os parâmetros virão na URL da requisição do nosso frontend
    // Ex: /api/weather?lat=37.4220&lng=-122.0841
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);
    const lat = requestUrl.searchParams.get("lat");
    const lng = requestUrl.searchParams.get("lng");
    const days = requestUrl.searchParams.get("days") || 7; // Pega 7 dias por padrão

    if (!lat || !lng) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ success: false, error: "Latitude e Longitude são obrigatórias" })
      );
      return;
    }

    // 1. Pegue sua chave secreta do Google do .env
    const apiKey = process.env.GOOGLE_API_KEY; // Usando a chave correta do Google!

    // 2. Monte a URL da API do Google Weather, como na documentação
    const googleApiUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${apiKey}&location.latitude=${lat}&location.longitude=${lng}&days=${days}`;

    // 3. O SERVIDOR faz a chamada para a API do Google
    const apiResponse = await fetch(googleApiUrl);
    const weatherData = await apiResponse.json();
    
    // 4. Verificação de erro da própria API do Google
    if (weatherData.error) {
      console.error("Erro da API do Google Weather:", weatherData.error.message);
      throw new Error(weatherData.error.message);
    }

    // 5. Envie a resposta de volta para o seu front-end
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true, data: weatherData }));

  } catch (error) {
    console.error("Erro ao buscar dados do tempo:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        error: "Erro ao buscar dados do tempo",
        details: error.message
      })
    );
  }
}

async function handleGeocodingRequest(req, res) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      // O frontend enviará um endereço ou nome de cidade
      const { address } = JSON.parse(body);
      if (!address) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ success: false, error: "Endereço não fornecido" })
        );
        return;
      }

      const apiKey = process.env.GOOGLE_API_KEY;

      // 2. Monte a URL da API de Geocodificação
      const params = new URLSearchParams({
        address: address,
        language: "pt-BR", // Pedir resultados em português
        key: apiKey,
      });
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;

      // 3. O SERVIDOR faz a chamada para a API do Google
      const apiResponse = await fetch(apiUrl);
      const geocodingData = await apiResponse.json();

      // 4. Verificação de status da própria API do Google (boa prática)
      if (geocodingData.status !== "OK") {
        throw new Error(
          `API de Geocodificação retornou status: ${geocodingData.status}`
        );
      }

      // 5. Envie a resposta de volta para o seu front-end
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

// Função principal para processar requisições
async function handleRequest(req, res) {
  // Configurações de CORS (essencial para seu React se comunicar com este servidor)
  res.setHeader("Access-Control-Allow-Origin", "*"); // Em produção, troque '*' pelo domínio do seu site
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- ROTEAMENTO: Decide o que fazer com base na URL ---
  // --- ROTEAMENTO: Decide o que fazer com base na URL ---
  if (req.url === "/api/gemini" && req.method === "POST") {
    handleGeminiRequest(req, res);
  } else if (req.url.startsWith("/api/weather") && req.method === "GET") {
    handleWeatherRequest(req, res);
  } else if (req.url === "/api/geocoding" && req.method === "POST") {
    // <-- NOVA ROTA AQUI
    handleGeocodingRequest(req, res);
  } else {
    // Se a rota não for encontrada
    res.writeHead(404);
    res.end("Rota não encontrada");
  }
}

// Cria e inicia o servidor
const server = createServer(handleRequest);
server.listen(3001, () => {
  console.log("🚀 Servidor rodando em http://localhost:3001");
  console.log(
    "✅ Pronto para receber requisições para: /api/gemini e /api/weather"
  );
});
