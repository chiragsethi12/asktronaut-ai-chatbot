import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("asktronaut_user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// AUTH
export const signupAPI = (data) => API.post("/auth/signup", data);
export const loginAPI = (data) => API.post("/auth/login", data);

// CHAT
export const getAllChatsAPI = () => API.get("/chat/all");
export const createChatAPI = () => API.post("/chat/new");
export const getChatByIdAPI = (id) => API.get(`/chat/${id}`);
export const sendMessageAPI = (id, content) =>
  API.post(`/chat/${id}/message`, { content });
export const deleteChatAPI = (id) => API.delete(`/chat/${id}`);
