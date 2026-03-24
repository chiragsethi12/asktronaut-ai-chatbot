export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {/* Avatar for assistant */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3 shrink-0 mt-1">
          AI
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-purple-600 text-white rounded-br-sm"
            : "bg-[#2a2a2a] text-gray-200 rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>

      {/* Avatar for user */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-bold ml-3 shrink-0 mt-1">
          You
        </div>
      )}
    </div>
  );
}
