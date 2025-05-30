import mongoose from "mongoose";

// Define the schema for the images
const imageSchema = new mongoose.Schema({
  filePath: { 
    type: String, 
    required: true 
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Create a model for the image schema
const Images = mongoose.model("Images", imageSchema);

export default Images;
