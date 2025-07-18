import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getBigFiveFromHistory } from "../lib/gemini";

type Entry = {
  date: string;
  personality: string;
};

type Props = {
  onClose: () => void;
};

type Level =
  | "Muy bajo"
  | "Bajo"
  | "Medio"
  | "Alto"
  | "Muy alto"
  | "Desconocido";

const levelColor: Record<Level, string> = {
  "Muy bajo": "bg-red-200 text-red-800",
  Bajo: "bg-orange-200 text-orange-800",
  Medio: "bg-yellow-200 text-yellow-800",
  Alto: "bg-lime-200 text-lime-800",
  "Muy alto": "bg-green-200 text-green-800",
  Desconocido: "bg-zinc-200 text-zinc-800",
};

export default function PersonalityHistoryModal({ onClose }: Props) {
  const [tab, setTab] = useState<"history" | "results">("history");
  const history: Entry[] = JSON.parse(
    localStorage.getItem("userPersonality") || "[]"
  );

  const [bigFiveResults, setBigFiveResults] = useState<
    { trait: string; level: Level }[] | null
  >(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === "results" && history.length > 0 && !bigFiveResults) {
      setLoading(true);
      getBigFiveFromHistory(history).then((res) => {
        console.log("Respuesta de getBigFiveFromHistory:", res);
        if (res) {
          const mappedResults = Object.entries(res).map(([trait, level]) => ({
            trait,
            level: (level as Level) ?? "Desconocido",
          }));
          setBigFiveResults(mappedResults);
        } else {
          setBigFiveResults(
            [
              "Apertura a la experiencia",
              "Responsabilidad",
              "Extraversión",
              "Amabilidad",
              "Neuroticismo",
            ].map((trait) => ({ trait, level: "Desconocido" as Level }))
          );
        }
        setLoading(false);
      });
    }
  }, [tab, history, bigFiveResults]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 transition"
          aria-label="Cerrar historial"
        >
          <X className="w-5 h-5 text-zinc-600" />
        </button>

        <div className="flex justify-center gap-4 mb-2">
          <button
            onClick={() => setTab("history")}
            className={`px-3 py-1 rounded-lg text-sm ${
              tab === "history"
                ? "bg-gray-600 text-white"
                : "bg-zinc-100 text-zinc-700"
            }`}
          >
            Historial
          </button>
          <button
            onClick={() => setTab("results")}
            className={`px-3 py-1 rounded-lg text-sm ${
              tab === "results"
                ? "bg-gray-600 text-white"
                : "bg-zinc-100 text-zinc-700"
            }`}
          >
            Resultados
          </button>
        </div>

        {tab === "history" ? (
          <>
            <h2 className="text-lg font-semibold">Historial de hipótesis</h2>
            {history.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Todavía no se ha inferido ninguna personalidad.
              </p>
            ) : (
              <ul className="space-y-2">
                {history.map((entry, i) => (
                  <li key={i} className="text-sm text-zinc-700">
                    <span className="block font-medium">
                      {new Date(entry.date).toLocaleString()}
                    </span>
                    <span className="block whitespace-pre-line">
                      {entry.personality}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : loading ? (
          <p className="text-center text-zinc-600">Cargando resultados...</p>
        ) : bigFiveResults ? (
          <>
            <h2 className="text-lg font-semibold">Resultados Big Five</h2>
            <ul className="space-y-2">
              {bigFiveResults.map(({ trait, level }, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-zinc-700">{trait}</span>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${levelColor[level]}`}
                  >
                    {level}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center text-zinc-600">
            No hay resultados para mostrar.
          </p>
        )}
      </div>
    </div>
  );
}
