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
          {[
            ["userName", "Nombre del usuario"],
            ["assistantName", "Nombre del asistente"],
            ["motivation", "Motivación del usuario"],
            ["level", "Nivel educativo"],
          ].map(([key, label]) => (
            <input
              key={key}
              placeholder={label}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value={(settings as any)[key] || ""}
              onChange={(e) => onChange({ ...settings, [key]: e.target.value })}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2"
            />
          ))}

          <select
            value={settings.style}
            onChange={(e) =>
              onChange({
                ...settings,
                style: e.target.value as Settings["style"],
              })
            }
            className="w-full border border-zinc-300 rounded-lg px-3 py-2"
          >
            <option value="socratic">Socrático</option>
            <option value="casual">Casual</option>
            <option value="friendly">Amigable</option>
            <option value="direct">Directo</option>
          </select>

          <select
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
          </select>

          {/* Toggle visual mode */}
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={settings.visualMode ?? false}
              onChange={(e) =>
                onChange({ ...settings, visualMode: e.target.checked })
              }
            />
            <span className="text-sm text-zinc-700">
              Activar modo visual (avatar con vídeo)
            </span>
          </label>
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
