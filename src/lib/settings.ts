export type Settings = {
  userName?: string;
  assistantName?: string;
  style?: "socratic" | "casual" | "friendly" | "direct";
  level?: "ESO" | "Bachillerato" | "Universidad" | "Otro";
  motivation?: string;
  tone: "formal" | "informal";
};

export const defaultSettings: Settings = {
  assistantName: "MAIke",
  style: "socratic",
  level: "Universidad",
  tone: "formal",
};
