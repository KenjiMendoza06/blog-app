import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      email === "" ||
      password === ""
    ) {
      res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
});

export const Signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    res.status(400).json({ message: "All fields are required" });
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    res.status(400).json({ message: "User not found" });
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .cookie("access_token", token, { httpOnly: true })
    .json({ validUser });
});
