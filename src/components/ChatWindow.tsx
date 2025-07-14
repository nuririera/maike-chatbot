import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

type Message = {
  role: "user" | "bot";
  content: string;
  isVideo?: boolean;
  videoSrc?: string;
};

type Props = {
  messages: Message[];
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ChatWindow({
  messages,
  input,
  loading,
  onInputChange,
  onSubmit,
}: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            role={msg.role}
            content={msg.content}
            isVideo={msg.isVideo}
            videoSrc={msg.videoSrc}
          />
        ))}
        {loading && (
          <div className="text-sm italic text-zinc-500">
            Maike está pensando...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="flex-1 border border-zinc-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Escribe tu mensaje..."
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
