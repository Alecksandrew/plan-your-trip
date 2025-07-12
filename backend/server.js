// server.js - Servidor simples e seguro para API do Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createServer } from 'http';
import { config } from 'dotenv';

// Carrega variáveis do .env
config();
// Cria o cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// Função para processar requisições
async function handleRequest(req, res) {
  // Permite requisições do seu React (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Responde ao OPTIONS (requisição prévia do navegador)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Só aceita POST
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Método não permitido');
    return;
  }

  try {
    // Pega os dados da requisição
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message } = JSON.parse(body);

        // Pega o modelo
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Gera o conteúdo
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Retorna a resposta
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          response: text
        }));
      } catch (error) {
        console.error('Erro ao processar:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: 'Erro ao processar requisição'
        }));
      }
    });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: 'Erro no servidor'
    }));
  }
}

// Cria e inicia o servidor
const server = createServer(handleRequest);
server.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001');
  console.log('✅ Pronto para receber requisições!');
});