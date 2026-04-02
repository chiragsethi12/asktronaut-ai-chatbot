const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect DB
connectDB();

// ================= CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://asktronaut.netlify.app",
];

// 🔥 Always respond with CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🔥 Handle preflight instantly
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Debug route
app.get("/test", (req, res) => {
  res.json({ message: "Test route working ✅" });
});

// ================= ROOT =================
app.get("/", (req, res) => {
  res.json({ message: "Asktronaut API is running 🚀" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});