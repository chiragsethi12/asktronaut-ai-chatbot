const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// ================= CORS CONFIG =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://asktronaut.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Handle preflight requests (CRITICAL)
app.options("*", cors());

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({ message: "Asktronaut API is running 🚀" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});