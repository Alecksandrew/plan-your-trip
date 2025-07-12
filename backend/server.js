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

// --- NOVA LÓGICA: Para a API de Clima ---
async function handleWeatherRequest(req, res) {
  try {
    // Exemplo: a API de clima precisa de uma cidade, que virá do front-end
    // Vamos assumir que o front-end enviará a cidade no corpo da requisição
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { city } = JSON.parse(body);
        if (!city) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ success: false, error: "Cidade não fornecida" })
          );
          return;
        }

        // 1. Pegue sua chave secreta do .env
        const apiKey = process.env.WEATHER_API_KEY;

        // 2. Monte a URL da API externa (substitua pela URL real da sua API de clima)
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`; // Exemplo com a WeatherAPI.com

        // 3. O SERVIDOR faz a chamada para a API externa
        const apiResponse = await fetch(apiUrl);
        const weatherData = await apiResponse.json();

        // 4. Envie a resposta de volta para o seu front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: weatherData }));
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: "Erro ao buscar dados do tempo",
          })
        );
      }
    });
  } catch (error) {
    console.error("Erro no servidor (weather):", error);
    res.writeHead(500);
    res.end("Erro interno no servidor");
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

      // 1. Use a MESMA chave do Google que você usa para o Gemini
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
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
  } else if (req.url === "/api/weather" && req.method === "POST") {
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
