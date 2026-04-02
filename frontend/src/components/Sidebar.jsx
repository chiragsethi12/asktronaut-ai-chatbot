import { useEffect, useState, useCallback } from "react";
import { getAllChatsAPI, createChatAPI, deleteChatAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, LogOut, MessageSquare, Pencil } from "lucide-react";
import EditableTitle from "./EditableTitle";

// Geometric astronaut logo — purely SVG, no emoji
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rocket body */}
        <path
          d="M12 2L14.5 9H9.5L12 2Z"
          fill="#3b82f6"
          opacity="0.9"
        />
        {/* Body */}
        <rect x="9" y="8" width="6" height="8" rx="1" fill="#3b82f6" opacity="0.7" />
        {/* Fins */}
        <path d="M9 13L6 17H9V13Z" fill="#3b82f6" opacity="0.5" />
        <path d="M15 13L18 17H15V13Z" fill="#3b82f6" opacity="0.5" />
        {/* Window */}
        <circle cx="12" cy="11" r="1.5" fill="#05070d" />
        {/* Exhaust */}
        <rect x="10.5" y="16" width="3" height="2" rx="0.5" fill="#3b82f6" opacity="0.4" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-white">
        Asktronaut
      </span>
    </div>
  );
}

export default function Sidebar({ activeChatId, onSelectChat, onNewChat }) {
  const [chats, setChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const { user, logout } = useAuth();

  const handleTitleChange = useCallback((chatId, newTitle) => {
    setChats((prev) =>
      prev.map((c) => (c._id === chatId ? { ...c, title: newTitle } : c))
    );
    setEditingChatId(null);
  }, []);

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
    <div className="w-[240px] shrink-0 bg-surface h-screen flex flex-col border-r border-border-subtle">
      {/* Logo header */}
      <div className="px-4 py-4 border-b border-border-subtle">
        <Logo />
      </div>

      {/* New Chat */}
      <div className="px-3 pt-3 pb-1">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium
            text-text-secondary border border-border-subtle hover:bg-white/5
            hover:border-primary/50 hover:text-white transition-colors duration-150"
        >
          <Plus className="w-4 h-4 shrink-0" />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-px">
        {chats.length === 0 && (
          <p className="text-text-muted text-xs text-center mt-6 px-3">
            No conversations yet
          </p>
        )}
        {chats.map((chat) => {
          const isActive = activeChatId === chat._id;
          return (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat._id)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm
                transition-colors duration-150 select-none
                ${isActive
                  ? "text-white bg-elevated/80 border border-white/5"
                  : "text-text-muted hover:text-white hover:bg-elevated/50 border border-transparent"
                }`}
            >
              {/* Active left-bar indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full shadow-glow" />
              )}
              <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />
              <EditableTitle
                chatId={chat._id}
                title={chat.title || "New Chat"}
                onTitleChange={handleTitleChange}
                startEditing={editingChatId === chat._id}
                onEditStart={() => setEditingChatId(chat._id)}
                onEditEnd={() => setEditingChatId(null)}
              />
              <div className="hidden group-hover:flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingChatId(chat._id);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-lg
                    text-text-muted hover:text-white hover:bg-white/10
                    transition-colors duration-150"
                  aria-label="Rename chat"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDelete(e, chat._id)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg
                    text-text-muted hover:text-red-400 hover:bg-red-400/10
                    transition-colors duration-150"
                  aria-label="Delete chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-border-subtle bg-surface flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar monogram */}
          <div className="w-8 h-8 rounded-xl bg-elevated border border-border-subtle
            flex items-center justify-center text-xs font-semibold text-primary shrink-0 shadow-sm">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate leading-tight">
              {user?.name}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-8 h-8 flex items-center justify-center rounded-xl
            text-text-muted hover:text-red-400 hover:bg-white/5
            transition-colors duration-150 shrink-0"
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
