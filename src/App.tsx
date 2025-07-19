import { useState, useEffect, useRef } from "react";
import { getGeminiResponse } from "./lib/gemini";
import { defaultSettings, type Settings } from "./lib/settings";
import ChatWindow from "./components/ChatWindow";
import SettingsModal from "./components/SettingsModal";
import { Settings as SettingsIcon, NotebookText } from "lucide-react";
import { extractPersonality } from "./lib/utils";
import PersonalityHistoryModal from "./components/PersonalityModal";
import WelcomeModal from "./components/WelcomeModal";

const initialSettings: Settings = {
  ...defaultSettings,
  userName: "Nuria",
  assistantName: "Maike",
  tone: "formal",
  visualMode: false,
  predictionMode: true,
};

type Message = {
  role: "user" | "bot";
  content: string;
  isVideo?: boolean;
  videoSrc?: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `Hola, soy ${initialSettings.assistantName}. ¿Qué tema te gustaría abordar hoy?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const prevVisualMode = useRef(settings.visualMode);
  useEffect(() => {
    if (!prevVisualMode.current && settings.visualMode) {
      const firstVideoMessage: Message = {
        role: "bot",
        content: "",
        isVideo: true,
        videoSrc: "/videos/response1.mp4",
      };
      setMessages((prev) => [...prev, firstVideoMessage]);
      setVideoIndex(1);
    }
    prevVisualMode.current = settings.visualMode;
  }, [settings.visualMode]);

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

      const { personality, clean } = extractPersonality(replyText);

      if (personality) {
        const existing = JSON.parse(
          localStorage.getItem("userPersonality") || "[]"
        );
        existing.push({ date: new Date().toISOString(), personality });
        localStorage.setItem("userPersonality", JSON.stringify(existing));
        //Guardar en un estado
        console.log("Personalidad inferida:", personality);
      }

      if (settings.visualMode) {
        const nextIndex = videoIndex % 5;
        setMessages([
          ...updatedMessages,
          {
            role: "bot",
            content: "", // No usamos content si es video
            isVideo: true,
            videoSrc: `/videos/response${nextIndex + 1}.mp4`,
          },
        ]);

        setVideoIndex(nextIndex + 1);
      } else {
        const botMessage: Message = { role: "bot", content: clean };
        setMessages([...updatedMessages, botMessage]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "bot",
          content: "Ocurrió un error al contactar con Maike.",
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
          {/* Turn Counter */}
          <span className="text-sm text-zinc-500">
            {Math.floor(messages.length)} turnos
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-full hover:bg-zinc-200 transition"
              aria-label="Ver historial"
            >
              <NotebookText className="w-5 h-5 text-zinc-700" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-zinc-200 transition"
              aria-label="Abrir ajustes"
            >
              <SettingsIcon className="w-5 h-5 text-zinc-700" />
            </button>
          </div>
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

      {showHistory && (
        <PersonalityHistoryModal
          onClose={() => setShowHistory(false)}
          settings={settings}
        />
      )}

      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
    </div>
  );
}

export default App;
