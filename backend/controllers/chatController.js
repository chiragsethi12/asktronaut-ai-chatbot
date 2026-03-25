const Chat = require("../models/Chat");
const { getAIResponse } = require("../utils/openRouter");

// @route   GET /api/chat/all — Get all chats for a user
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select("_id title createdAt")
      .sort({ createdAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

// @route   POST /api/chat/new — Create a new chat session
const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat" });
  }
};

// @route   GET /api/chat/:id — Get a specific chat with messages
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};

// @route   POST /api/chat/:id/message — Send a message and get AI response
const sendMessage = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Add user message to chat
    chat.messages.push({ role: "user", content });

    // Auto-set title from first message
    if (chat.messages.length === 1) {
      chat.title = content.slice(0, 40) + (content.length > 40 ? "..." : "");
    }

    // Build context array for OpenRouter (all previous messages)
    const contextMessages = chat.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Get AI response
    const aiResponse = await getAIResponse(contextMessages);

    // Save AI response to chat
    chat.messages.push({ role: "assistant", content: aiResponse });
    await chat.save();

    res.json({
      userMessage: { role: "user", content },
      aiMessage: { role: "assistant", content: aiResponse },
    });
  } catch (error) {
    console.error("Send message error:", error.message);
    res.status(500).json({ message: "Failed to get AI response. Try again." });
  }
};

// @route   DELETE /api/chat/:id — Delete a chat session
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat" });
  }
};

module.exports = {
  getAllChats,
  createChat,
  getChatById,
  sendMessage,
  deleteChat,
};
