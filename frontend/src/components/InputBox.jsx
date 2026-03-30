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
          className={`flex items-end bg-white/5 backdrop-blur-xl rounded-[2rem] border shadow-lg
            transition-all duration-300
            ${disabled ? "border-white/5 opacity-80" : "border-white/10 hover:border-white/20 focus-within:border-primary/50 focus-within:shadow-glow-focus"}`}
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
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-300"
                  aria-label={isPaused ? "Resume generating" : "Pause generating"}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={onStop}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-300"
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>
            ) : showRegenerate && !input.trim() ? (
              <button
                onClick={onRegenerate}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-300"
                aria-label="Regenerate response"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={disabled || !input.trim() || isSending}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${(!input.trim() || disabled)
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dim shadow-glow hover:shadow-glow-hover"
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
