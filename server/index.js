//This file sets up the Express server, connects to MongoDB, and defines routes.
// and handles requests for the scan functionality.


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scanRoutes from "./routes/scan.js";

dotenv.config();
console.log("✅ MONGO_URI loaded:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/scan", scanRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
