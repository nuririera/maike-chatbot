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

      <form onSubmit={onSubmit} className="flex items-end gap-2 mt-2">
        <textarea
          value={input}
          onChange={(e) => {
            onInputChange(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
          rows={1}
          className="flex-1 resize-none overflow-hidden border border-zinc-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Escribe tu mensaje..."
          style={{ maxHeight: "150px" }}
        />

        <button
          type="submit"
          disabled={loading}
          className="h-[42px] bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
