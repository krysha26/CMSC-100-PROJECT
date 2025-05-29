import User from "../models/User.js";
import argon2 from 'argon2';
import jwt from "jsonwebtoken";

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
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const { password1, password2 } = req.body || {};
    const isMatch1 = password1==password2;
    const isMatch2 = await argon2.verify(password1, user.password);
    if (isMatch1 && isMatch2){
      return res.status(400).json({ message: "Missing Email and Password" });
    }
    const deleted = await User.findByIdAndDelete(req.params.id);
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
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body || {};
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    if (!firstName || !lastName || !email || !password){
      return res.status(400).json({ message: "Missing Essential Field" });
    }
    const existing = await User.findOne({ email });
    let user; // so user can be used outside of the block scope
    if (existing) return res.status(400).json({ message: "User already exists" });
    else{ 
      const hashedPassword = await argon2.hash(password);
      user = new User({firstName, lastName, email, password: hashedPassword });
      await user.save(); // to save user
    }
    res.status(201).json(user);
    const token = jwt.sign({ id: user._id }, JWT_LOGIN_SECRET, {expiresIn: "1d"});
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/users/signIn
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password){
      return res.status(400).json({ message: "Missing Email and Password" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });
    const isMatch = await argon2.verify(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    if (user.userType == "Admin"){
      const mastertoken = jwt.sign({ id: user._id }, process.env.JWT_ROUTE_SECRET, {
        expiresIn: "1d", // Token expiration
      });
      res.status(200).json({
        mastertoken,
        user: { id: user._id, email: user.email }
      });
    }
    else {
      const token = jwt.sign({ id: user._id }, JWT_LOGIN_SECRET, {expiresIn: "1d"});
      res.status(200).json({
        token,
        user: { id: user._id, email: user.email }
      });
    }
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