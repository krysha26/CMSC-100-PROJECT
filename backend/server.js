import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // Import multer for file uploads
import path from "path";

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

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

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
app.use("/api/users", userRoutes); // Placed after specific DELETE route
app.use("/api/products", productRoutes);

// POST endpoint for uploading a product image
app.post('/api/products/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'File uploaded successfully',
      fileUrl: `/uploads/${req.file.filename}`, // Send the file URL back
    });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
