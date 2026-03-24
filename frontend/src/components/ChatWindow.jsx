import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Ask<span className="text-purple-500">tronaut</span>
        </h2>
        <p className="text-gray-500 text-sm max-w-sm">
          Your AI-powered chatbot. Ask anything — coding, writing, ideas, and
          more!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-start mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3 shrink-0">
            AI
          </div>
          <div className="bg-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
