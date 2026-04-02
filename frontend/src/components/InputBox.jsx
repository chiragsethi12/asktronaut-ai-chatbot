import { useState, useRef } from "react";
import { ArrowUp, Square, RefreshCw, Pause, Play } from "lucide-react";

export default function InputBox({
  onSend,
  disabled,
  isGenerating,
  onStop,
  showRegenerate,
  onRegenerate,
  onTogglePause,
  isPaused
}) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  };

  const handleSend = () => {
    if (!input.trim() || disabled || isSending) return;
    setIsSending(true);
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setTimeout(() => setIsSending(false), 300);
  };

  const handleKeyDown = (e) => {
    console.log(
      "Key pressed:",
      e.key,
      "Code:",
      e.code,
      "ShiftKey:",
      e.shiftKey,
    );

    // Only check for plain Enter (no modifiers)
    if (e.code === "Enter" || e.key === "Enter") {
      console.log("Enter key detected");

      // If Shift is held, allow default (new line)
      if (e.shiftKey) {
        console.log("Shift+Enter detected, allowing new line");
        return;
      }

      console.log(
        "Attempting to send message. Input:",
        input,
        "Disabled:",
        disabled,
      );

      // Must preventDefault to prevent newline
      e.preventDefault();

      // Send the message
      const text = input.trim();
      if (text && !disabled && !isSending) {
        console.log("Sending message:", text);
        setIsSending(true);
        onSend(text);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setTimeout(() => setIsSending(false), 300);
      } else {
        console.log("Cannot send: text empty, disabled, or already sending");
      }
    }
  };

  return (
    <div className="bg-transparent px-4 pb-6 pt-2 z-20 relative">
      <div className="max-w-4xl mx-auto">
        <div
          className={`flex items-end bg-[#0B0F18] rounded-xl border
            transition-colors duration-150
            ${disabled ? "border-white/5 opacity-80" : "border-white/10 focus-within:border-white/20"}`}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Message Asktronaut..."
            disabled={disabled}
            className="flex-1 bg-transparent text-white text-[0.95rem] outline-none
              placeholder-text-muted px-6 py-4 leading-relaxed resize-none
              disabled:opacity-50 max-h-[150px] overflow-y-auto"
            style={{ minHeight: "56px" }}
          />
          <div className="py-2 pr-2 pl-1 flex items-center shrink-0">
            {isGenerating ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onTogglePause}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-white transition-colors duration-150"
                  aria-label={isPaused ? "Resume generating" : "Pause generating"}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={onStop}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors duration-150"
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>
            ) : showRegenerate && !input.trim() ? (
              <button
                onClick={onRegenerate}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors duration-150"
                aria-label="Regenerate response"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={disabled || !input.trim() || isSending}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-150
                  ${(!input.trim() || disabled)
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white hover:bg-white/10"
                  }`}
                aria-label="Send message"
              >
                <ArrowUp className="w-[1.125rem] h-[1.125rem] stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
        <p className="text-center text-text-muted/60 text-[11px] mt-3 font-medium tracking-wide">
          SHIFT + ENTER for new line
        </p>
      </div>
    </div>
  );
}
