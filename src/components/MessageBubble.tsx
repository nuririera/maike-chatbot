type MessageProps = {
  role: "user" | "bot";
  content: string;
};

export default function MessageBubble({ role, content }: MessageProps) {
  return (
    <div
      className={`p-3 rounded-xl w-fit max-w-[80%] text-sm whitespace-pre-wrap ${
        role === "user"
          ? "self-end bg-blue-100 text-right"
          : "self-start bg-gray-200"
      }`}
    >
      {content}
    </div>
  );
}
