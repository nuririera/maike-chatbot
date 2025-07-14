export type Settings = {
  userName?: string;
  assistantName?: string;
  style?: "socratic" | "casual" | "friendly" | "direct";
  level?: "ESO" | "Bachillerato" | "Universidad" | "Otro";
  motivation?: string;
  tone: "formal" | "informal";
  visualMode?: boolean;
};

export const defaultSettings: Settings = {
  assistantName: "Maike",
  style: "socratic",
  level: "Universidad",
  tone: "formal",
};
