import type { Settings } from "../lib/settings";
import { X } from "lucide-react";

type Props = {
  settings: Settings;
  onClose: () => void;
  onChange: (updated: Settings) => void;
};

export default function SettingsModal({ settings, onClose, onChange }: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 transition"
          aria-label="Cerrar ajustes"
        >
          <X className="w-5 h-5 text-zinc-600" />
        </button>
        <h2 className="text-lg font-semibold">Configuración del asistente</h2>
        <div className="space-y-2">
          {[["userName", "Nombre del usuario"]].map(([key, label]) => (
            <input
              key={key}
              placeholder={label}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={(settings as any)[key] || ""}
              onChange={(e) => onChange({ ...settings, [key]: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2"
            />
          ))}

          {/* <select
            value={settings.tone}
            onChange={(e) =>
              onChange({
                ...settings,
                tone: e.target.value as Settings["tone"],
              })
            }
            className="w-full border border-zinc-300 rounded-lg px-3 py-2"
          >
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select> */}

          {/* Toggle visual mode */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-zinc-700">
              Activar modo visual (avatar con vídeo)
            </span>
            <button
              onClick={() =>
                onChange({ ...settings, visualMode: !settings.visualMode })
              }
              className={`relative w-11 h-6 transition-colors duration-300 rounded-full ${
                settings.visualMode ? "bg-gray-700" : "bg-zinc-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  settings.visualMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle personality prediction mode */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-zinc-700">
              Activar modo predicción de personalidad
            </span>
            <button
              onClick={() =>
                onChange({
                  ...settings,
                  predictionMode: !settings.predictionMode,
                })
              }
              className={`relative w-11 h-6 transition-colors duration-300 rounded-full ${
                settings.predictionMode ? "bg-gray-700" : "bg-zinc-300"
              }`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  settings.predictionMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
