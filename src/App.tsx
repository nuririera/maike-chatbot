import { useState } from "react";
import { getGeminiResponse } from "./lib/gemini";
import { defaultSettings, type Settings } from "./lib/settings";
import ChatWindow from "./components/ChatWindow";
import SettingsModal from "./components/SettingsModal";
import { Settings as SettingsIcon } from "lucide-react";

const initialSettings: Settings = {
  ...defaultSettings,
  userName: "Nuria",
  assistantName: "MAIke",
  motivation: "preparar sus exámenes de ingeniería mecánica",
  style: "socratic",
  level: "Universidad",
  tone: "formal",
  visualMode: false,
};

type Message = { role: "user" | "bot"; content: string };

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `Hola, soy ${initialSettings.assistantName}. ¿En qué puedo ayudarte hoy?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = { role: "user", content: input };
    const updatedMessages: Message[] = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const replyText = await getGeminiResponse(updatedMessages, settings);

      if (settings.visualMode) {
        const nextIndex = (videoIndex + 1) % 3;
        setMessages([
          ...updatedMessages,
          {
            role: "bot",
            content: `<video src="/videos/response${
              nextIndex + 1
            }.mp4" controls class="rounded-xl w-full" autoplay playsinline />`,
          },
        ]);

        setVideoIndex(nextIndex);
      } else {
        const botMessage: Message = { role: "bot", content: replyText };
        setMessages([...updatedMessages, botMessage]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "bot",
          content: "Ocurrió un error al contactar con MAIke.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-zinc-800">
            {settings.assistantName}
          </h1>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-zinc-200 transition"
            aria-label="Abrir ajustes"
          >
            <SettingsIcon className="w-5 h-5 text-zinc-700" />
          </button>
        </div>

        <ChatWindow
          messages={messages}
          input={input}
          loading={loading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onChange={setSettings}
        />
      )}
    </div>
  );
}

export default App;
