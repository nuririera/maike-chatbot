// src/lib/promptBuilder.ts
import type { Settings } from "./settings";

export function buildSystemMessage(settings: Settings): string {
  const name = settings.assistantName || "Maike";
  const user = settings.userName ? `Su nombre es ${settings.userName}.` : "";
  const tone =
    settings.tone === "informal"
      ? "Usa un lenguaje cercano y relajado."
      : "Mantén un tono educado y claro.";
  const style = {
    socratic:
      "No des respuestas directas. Guía al usuario con preguntas que fomenten su pensamiento crítico.",
    casual: "Responde de forma cercana, con ejemplos cotidianos.",
    friendly: "Sé amable y animado. Motiva al usuario a seguir aprendiendo.",
    direct: "Sé claro y conciso. Da información concreta.",
  }[settings.style ?? "socratic"];

  const level = settings.level
    ? `Está estudiando a nivel de ${settings.level}.`
    : "";
  const goal = settings.motivation
    ? `Está usando este sistema con el objetivo de ${settings.motivation}.`
    : "";

  return `Eres ${name}, un asistente educativo diseñado para ayudar a aprender. ${user} ${level} ${goal} ${style} ${tone}`;
}
