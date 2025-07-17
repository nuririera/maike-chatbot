export type Settings = {
  userName?: string;
  assistantName?: string;
  tone: "formal" | "informal";
  visualMode?: boolean;
  predictionMode?: boolean;
};

export const defaultSettings: Settings = {
  assistantName: "Maike",
  tone: "formal",
  visualMode: false,
  predictionMode: true,
};
