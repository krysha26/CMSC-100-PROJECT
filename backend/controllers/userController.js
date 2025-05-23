import User from "../models/User.js";
import argon2 from 'argon2';
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// GET /api/users/:id
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");//edited
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // if (!updated) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/users/signUp
const signUp = async (req, res) => {
  try {
    // const user = new User(req.body);
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    let user; // so user can be used outside of the block scope

    if (existing) 
     return res.status(400).json({ message: "User already exists" });
    else{ 
      const hashedPassword = await argon2.hash(password);
      user = new User({ email, password: hashedPassword });
      await user.save(); // to save user
    }
    
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// POST /api/users/signIn
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await argon2.verify(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiration
    });
  
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/users/signOut
const signOut = async (req, res) => {
  // Add session/token logic if needed
  res.clearCookie("token");
  res.json({ message: "Signed out successfully" });
};

export {getUser,getAllUsers,updateUser,deleteUser,signUp, signIn, signOut}


// import mongoose from "mongoose";
// import {User} from "../models/User.js";



// // GET /api/users/:id
// const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET /api/users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // PUT /api/users/:id
// const updateUser = async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // DELETE /api/users/:id
// const deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // POST /api/users/signUp
// const signUp = async (req, res) => {
//   try {
//     const {email,password} = req.body;
//     const user = new User({email,password});
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // POST /api/users/signIn
// const signIn = async (resq, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // POST /api/users/signOut
// const signOut = async (req, res) => {
//   // Add session/token logic if needed
//   res.json({ message: "Signed out successfully" });
// };

// export {getUser,getAllUsers,updateUser,deleteUser,signUp, signIn, signOut}