import { useState } from "react";

export default function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-[#2a2a2a] bg-[#0f0f0f]">
      <div className="flex items-end gap-3 bg-[#1a1a1a] rounded-2xl px-4 py-3 border border-[#2a2a2a] focus-within:border-purple-500 transition">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          disabled={disabled}
          className="flex-1 bg-transparent text-white text-sm outline-none resize-none placeholder-gray-500 max-h-32 overflow-y-auto"
          style={{ lineHeight: "1.5" }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white p-2 rounded-xl transition shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-90"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <p className="text-center text-gray-600 text-xs mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
