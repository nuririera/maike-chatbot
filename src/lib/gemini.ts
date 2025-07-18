import { buildSystemMessage } from "./promptBuilder";
import { defaultSettings } from "./settings";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getBigFiveFromHistory(
  history: { date: string; personality: string }[]
) {
  const systemMessage = buildSystemMessage(defaultSettings);

  const userPrompt = `
A partir de este historial de hipótesis de personalidad extraídas de conversaciones con un usuario:

${history
  .map(
    (entry, i) =>
      `${i + 1}. Fecha: ${new Date(entry.date).toLocaleDateString()}\n${
        entry.personality
      }`
  )
  .join("\n\n")}

Por favor, para cada una de las cinco dimensiones del Big Five:

- Apertura a la experiencia
- Responsabilidad
- Extraversión
- Amabilidad
- Neuroticismo

devuelve un nivel cualitativo que puede ser uno de estos valores: "Muy bajo", "Bajo", "Medio", "Alto", "Muy alto" o "Desconocido" si no hay información suficiente.

Devuelve únicamente un JSON con la siguiente estructura sin texto adicional:

{
  "Apertura a la experiencia": "Nivel",
  "Responsabilidad": "Nivel",
  "Extraversión": "Nivel",
  "Amabilidad": "Nivel",
  "Neuroticismo": "Nivel"
}
`;

  const context = [
    {
      role: "user",
      parts: [{ text: systemMessage }],
    },
    {
      role: "user",
      parts: [{ text: userPrompt }],
    },
  ];

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    API_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents: context }),
  });

  const data = await response.json();
  console.log(
    "[Respuesta cruda Gemini BigFive]:",
    JSON.stringify(data, null, 2)
  );

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("[Texto bruto devuelto por Gemini]:", text);

  function extractJSON(text: string): string | null {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? match[0] : null;
  }

  const rawJSON = extractJSON(text ?? "");
  if (!rawJSON) {
    console.error("No se encontró JSON válido en la respuesta");
    return null;
  }

  try {
    return JSON.parse(rawJSON);
  } catch (error) {
    console.error("Error parsing JSON Big Five:", error, rawJSON);
    return null;
  }
}

export async function getGeminiResponse(
  messages: { role: string; content: string }[],
  settings = defaultSettings
) {
  const systemMessage = buildSystemMessage(settings);

  const context = [
    {
      role: "user",
      parts: [{ text: systemMessage }],
    },
    ...messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  ];

  console.log("[Prompt enviado a Gemini]\n", systemMessage);
  console.log("[📤 Contexto completo enviado a Gemini]", context);

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    API_KEY;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents: context }),
  });

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ?? "Lo siento, no entendí eso.";
}
