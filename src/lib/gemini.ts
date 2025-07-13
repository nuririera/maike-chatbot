import { buildSystemMessage } from "./promptBuilder";
import { defaultSettings } from "./settings";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
