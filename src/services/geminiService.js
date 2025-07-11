// Serviço para fazer requisições ao seu backend
const BACKEND_URL_ = 'http://localhost:3001';

export async function callGemini(message) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    
    if (data.success) {
      return data.response;
    } else {
      throw new Error(data.error || 'Erro na API');
    }
  } catch (error) {
    console.error('Erro ao chamar Gemini:', error);
    throw error;
  }
}

// Exemplo de uso:
// import { callGemini } from './services/geminiService';
// 
// const response = await callGemini('Crie um roteiro de viagem para Paris');
// console.log(response);
