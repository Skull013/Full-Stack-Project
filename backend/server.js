import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// CORS
app.use(
  cors({
    origin: "https://full-stack-project-fawn.vercel.app", // frontend URL
    credentials: true,
  })
);

// Test route
app.get("/api/ping", (req, res) => res.json({ message: "Server is alive!" }));

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
