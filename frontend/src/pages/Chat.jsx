import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import { getChatByIdAPI, sendMessageAPI } from "../services/api";

export default function Chat() {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load messages when a chat is selected
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      try {
        const { data } = await getChatByIdAPI(activeChatId);
        setMessages(data.messages);
      } catch (err) {
        console.error("Failed to load chat");
      }
    };
    fetchMessages();
  }, [activeChatId]);

  const handleSend = async (content) => {
    if (!activeChatId) return;

    // Optimistically add user message
    const userMsg = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const { data } = await sendMessageAPI(activeChatId, content);
      setMessages((prev) => [...prev, data.aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Failed to get a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeChatId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
        onNewChat={(id) => {
          setActiveChatId(id);
          setMessages([]);
        }}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChatId ? (
          <>
            <ChatWindow messages={messages} loading={loading} />
            <InputBox onSend={handleSend} disabled={loading} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome to Ask<span className="text-purple-500">tronaut</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-6">
              Start a new chat or select an existing one from the sidebar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
