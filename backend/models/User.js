import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  userType: String,
  email: { type: String, unique: true },
  password: String,
  role: { 
    type: String, 
    enum: ['admin', 'customer'],
    default: 'customer'
  }
});

const User = mongoose.model("User", userSchema);
export default User;
