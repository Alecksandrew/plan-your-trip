import { useState, useEffect} from "react";

export default function Count({}) {
// 1. Pega o timestamp atual (em milissegundos)
const nowTimestamp = Date.now();

// 2. Define 24 horas em milissegundos
const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

// 3. Soma os dois para obter o timestamp futuro
const expirationTimestamp = nowTimestamp + twentyFourHoursInMs;

// 4. Para usar, você pode converter de volta para um objeto Date
const expirationDate = new Date(expirationTimestamp);
}