import user from "../models/user.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await user.comparePassword(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({ message: "Logout successful" });
};

export const getMe = async (req, res) => {
  try {
    const existingUser = await user.findById(req.userId).select("-password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await user.hashPassword(password);
    const newUser = new user({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};