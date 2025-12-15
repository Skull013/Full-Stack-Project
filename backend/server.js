import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "https://full-stack-project-fawn.vercel.app",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors({
  origin: "https://full-stack-project-fawn.vercel.app",
  credentials: true,
}));

connectDB();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
