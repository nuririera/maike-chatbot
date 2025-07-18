export default function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 relative">
        <h2 className="text-xl font-semibold">¡Bienvenido al estudio!</h2>
        <p className="text-sm text-zinc-700 text-justify">
          Gracias por participar en este estudio. Interactúa con Maike como lo
          harías normalmente al conversar con otra persona.
          <br />
          La conversación se desarrollará a modo de diálogo, donde podréis
          intercambiar ideas, comentar algún tema que te interese o dejar que
          Maike te proponga uno.
          <br />
          <br />
          Si lo deseas, siéntete libre de cambiar de tema en cualquier momento o
          de responder como te resulte más natural.
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
