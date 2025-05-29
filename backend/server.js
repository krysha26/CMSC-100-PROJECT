import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import User from './models/User.js';

dotenv.config();
const uri = process.env.MONGODB_URI;
console.log(uri);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true }));



// Configure CORS
const corsOptions = {
  origin: '*', // Add your frontend URLs here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Simple route for checking server status
app.get("/", (req, res) => {
  res.send("Hello, world!");
});



// API routes
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);  // Placed after specific DELETE route
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
