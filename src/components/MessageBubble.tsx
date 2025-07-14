type Props = {
  role: "user" | "bot";
  content: string;
  isVideo?: boolean;
  videoSrc?: string;
};

export default function MessageBubble({
  role,
  content,
  isVideo,
  videoSrc,
}: Props) {
  return (
    <div
      className={`p-3 rounded-xl w-fit max-w-[80%] text-sm whitespace-pre-wrap ${
        role === "user"
          ? "self-end bg-blue-100 text-right"
          : "self-start bg-gray-200"
      }`}
    >
      {isVideo ? (
        <video
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="rounded-xl w-full"
        />
      ) : (
        content
      )}
    </div>
  );
}
