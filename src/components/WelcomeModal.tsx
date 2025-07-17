// src/components/WelcomeModal.tsx
export default function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 relative">
        <h2 className="text-xl font-semibold">¡Bienvenida al estudio!</h2>
        <p className="text-sm text-zinc-700">
          Gracias por participar en este estudio. Interactúa con MAIke como lo
          harías normalmente.
          <br />
          Durante la conversación, el asistente intentará inferir tu
          personalidad a partir de tus respuestas.
          <br />
          Si activas el modo visual, las respuestas aparecerán en formato vídeo.
        </p>
        <p className="text-sm text-zinc-500 italic">
          Puedes modificar el estilo del asistente en los ajustes ⚙️ o consultar
          el historial 📝.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
}
