import { useEffect, useState } from "react";
import { getAllChatsAPI, createChatAPI, deleteChatAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ activeChatId, onSelectChat, onNewChat }) {
  const [chats, setChats] = useState([]);
  const { user, logout } = useAuth();

  const fetchChats = async () => {
    try {
      const { data } = await getAllChatsAPI();
      setChats(data);
    } catch (err) {
      console.error("Failed to fetch chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [activeChatId]);

  const handleNewChat = async () => {
    try {
      const { data } = await createChatAPI();
      setChats((prev) => [data, ...prev]);
      onNewChat(data._id);
    } catch (err) {
      console.error("Failed to create chat");
    }
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    try {
      await deleteChatAPI(chatId);
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (activeChatId === chatId) onNewChat(null);
    } catch (err) {
      console.error("Failed to delete chat");
    }
  };

  return (
    <div className="w-64 bg-[#111111] h-screen flex flex-col border-r border-[#2a2a2a]">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2a2a]">
        <h1 className="text-xl font-bold text-white">
          Ask<span className="text-purple-500">tronaut</span> 🚀
        </h1>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition"
        >
          <span className="text-lg">+</span> New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.length === 0 && (
          <p className="text-gray-600 text-xs text-center mt-4">No chats yet</p>
        )}
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat._id)}
            className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition ${
              activeChatId === chat._id
                ? "bg-[#2a2a2a] text-white"
                : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
            }`}
          >
            <span className="truncate flex-1">{chat.title || "New Chat"}</span>
            <button
              onClick={(e) => handleDelete(e, chat._id)}
              className="hidden group-hover:block text-gray-500 hover:text-red-400 ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white font-medium truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="text-xs text-gray-500 hover:text-red-400 transition ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
