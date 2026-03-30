import { useState, useEffect, useCallback, useRef } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import { getChatByIdAPI, sendStreamingMessageAPI } from "../services/api";

export default function Chat() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingIndex, setTypingIndex] = useState(null);

  // New states for streaming
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const abortControllerRef = useRef(null);
  const lastQueryRef = useRef("");

  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      setTypingIndex(null);
      setShowRegenerate(false);
      setIsRegenerating(false);
      return;
    }
    const fetchMessages = async () => {
      try {
        const { data } = await getChatByIdAPI(activeChatId);
        setMessages(data.messages);
        setTypingIndex(null);
        setShowRegenerate(false);
        setIsRegenerating(false);
      } catch (err) {
        console.error("Failed to load chat");
      }
    };
    fetchMessages();

    // Cleanup abort controller on unmount or chat change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [activeChatId]);

  const handleTypingComplete = useCallback(() => {
    setTypingIndex(null);
  }, []);

  const handleSend = async (content, isRegenerateCall = false) => {
    if (!activeChatId) return;

    let apiContent = "";
    const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 5); // unique requestId

    if (isRegenerateCall) {
      setIsRegenerating(true);
      apiContent = lastQueryRef.current;

      setMessages((prev) => {
        const newMsgs = [...prev];
        if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].role === "assistant") {
          newMsgs.pop();
        }
        newMsgs.push({ id: uniqueId, role: "assistant", text: "", content: "", buffer: "", status: "streaming" });
        return newMsgs;
      });
    } else {
      setIsRegenerating(false);
      lastQueryRef.current = content;
      apiContent = content;

      setMessages((prev) => [
        ...prev,
        { id: `user-${uniqueId}`, role: "user", text: apiContent, content: apiContent },
        { id: uniqueId, role: "assistant", text: "", content: "", buffer: "", status: "streaming" }
      ]);
    }

    setLoading(true);
    setTypingIndex(null);
    setShowRegenerate(false);
    setIsGenerating(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await sendStreamingMessageAPI(
        activeChatId,
        apiContent,
        abortControllerRef.current.signal,
        isRegenerateCall
      );
      
      setLoading(false); // Stop loading animation, streaming starts

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        const lines = chunkText.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "chunk" && data.content) {
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  const msgIndex = newMsgs.findIndex(m => m.id === uniqueId);
                  
                  if (msgIndex !== -1) {
                    const targetMsg = { ...newMsgs[msgIndex] };
                    
                    if (targetMsg.status === "paused") {
                      targetMsg.buffer += data.content;
                    } else {
                      targetMsg.text += data.content;
                      targetMsg.content = targetMsg.text; // backwards compatibility
                    }
                    
                    newMsgs[msgIndex] = targetMsg;
                  }
                  return newMsgs;
                });
              } else if (data.type === "error") {
                throw new Error(data.message);
              }
            } catch (e) {
              // Parse error on split chunk, ignore
            }
          }
        }
      }
      
      // On natural stream completion, mark as done and flush buffer
      setMessages((prev) => {
        const newMsgs = [...prev];
        const msgIndex = newMsgs.findIndex(m => m.id === uniqueId);
        if (msgIndex !== -1) {
          const targetMsg = { ...newMsgs[msgIndex] };
          targetMsg.status = "done";
          if (targetMsg.buffer) {
            targetMsg.text += targetMsg.buffer;
            targetMsg.content = targetMsg.text;
            targetMsg.buffer = "";
          }
          newMsgs[msgIndex] = targetMsg;
        }
        return newMsgs;
      });
      
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Stream stopped by user");
        setShowRegenerate(true);
        // Mark as done on abort
        setMessages((prev) => {
          const newMsgs = [...prev];
          const msgIndex = newMsgs.findIndex(m => m.id === uniqueId);
          if (msgIndex !== -1) {
            newMsgs[msgIndex] = { ...newMsgs[msgIndex], status: "done" };
          }
          return newMsgs;
        });
      } else {
        setMessages((prev) => {
          const newMsgs = [...prev];
          const msgIndex = newMsgs.findIndex(m => m.id === uniqueId);
          if (msgIndex !== -1) {
            const targetMsg = { ...newMsgs[msgIndex] };
            if (targetMsg.text === "") {
              targetMsg.text = "Failed to get a response. Please try again.";
              targetMsg.content = targetMsg.text;
              targetMsg.status = "done";
            }
            newMsgs[msgIndex] = targetMsg;
          }
          return newMsgs;
        });
      }
    } finally {
      // Check if this is the active stream before ending generation, someone could have sent another one
      const currentActiveMsg = lastQueryRef.current === apiContent;
      if (currentActiveMsg) {
        setIsGenerating(false);
        setLoading(false);
      }
      abortControllerRef.current = null;
      setIsRegenerating(false); // Reset when generation finishes or fails
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    abortControllerRef.current = null;
    setIsRegenerating(false);
  };

  const handleTogglePause = () => {
    setMessages((prev) => {
      const newMsgs = [...prev];
      // Find the last assistant message that is streaming or paused
      for (let i = newMsgs.length - 1; i >= 0; i--) {
        if (newMsgs[i].role === "assistant" && (newMsgs[i].status === "streaming" || newMsgs[i].status === "paused")) {
          const targetMsg = { ...newMsgs[i] };
          if (targetMsg.status === "streaming") {
            targetMsg.status = "paused";
          } else {
            targetMsg.status = "streaming";
            // Flush buffer
            targetMsg.text += targetMsg.buffer;
            targetMsg.content = targetMsg.text;
            targetMsg.buffer = "";
          }
          newMsgs[i] = targetMsg;
          break; // Only toggle the most recent active stream
        }
      }
      return newMsgs;
    });
  };

  const handleRegenerate = () => {
    if (lastQueryRef.current) {
      handleSend(lastQueryRef.current, true);
    }
  };

  return (
    <div className="flex h-screen bg-base overflow-hidden relative">
      <div className="starfield" />

      <div className="relative z-10">
        <Sidebar
          activeChatId={activeChatId}
          onSelectChat={(id) => setActiveChatId(id)}
          onNewChat={(id) => {
            setActiveChatId(id);
            setMessages([]);
            setTypingIndex(null);
            setShowRegenerate(false);
          }}
        />
      </div>

      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {activeChatId ? (
          <>
            <ChatWindow
              messages={messages}
              loading={loading}
              typingIndex={typingIndex}
              onTypingComplete={handleTypingComplete}
            />
            <InputBox 
              onSend={handleSend} 
              disabled={loading} 
              isGenerating={isGenerating}
              onStop={handleStop}
              showRegenerate={showRegenerate}
              onRegenerate={handleRegenerate}
              onTogglePause={handleTogglePause}
              isPaused={messages.some(m => m.role === "assistant" && m.status === "paused")}
            />
          </>
        ) : (
          <ChatWindow messages={[]} loading={false} />
        )}
      </div>
    </div>
  );
}
