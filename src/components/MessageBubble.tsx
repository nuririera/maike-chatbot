import { useEffect, useRef } from "react";

type Props = {
  role: "user" | "bot";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isVideo = content.includes("<video");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, [content]);

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
          ref={videoRef}
          src={getVideoSrcFromHTML(content)}
          controls
          autoPlay
          muted
          playsInline
          onEnded={() => {
            // Aquí podrías disparar algún callback si lo deseas
          }}
          className="rounded-xl w-full"
        />
      ) : (
        content
      )}
    </div>
  );
}

function getVideoSrcFromHTML(html: string): string {
  const match = html.match(/src="([^"]+)"/);
  return match?.[1] ?? "";
}
