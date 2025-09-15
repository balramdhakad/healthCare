import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const registerUser = async (req, res) => {
    console.log(req.body)
  try {
    const { mobileNo, password, role } = req.body;

    if (!mobileNo || !password || !role)
      return res.status(400).json({ message: "Fill All Fields fields" });

    const userExists = await User.findOne({ mobileNo });

    if (userExists)
      return res
        .status(400)
        .json({ message: "Mobile Number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      mobileNo,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        mobileNo: user.mobileNo,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error while Register User",
      Error: err?.message,
    });
  }
};

//loginUser
const loginUser = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    if (!mobileNo || !password)
      return res.status(400).json({ message: "Fill All Fields fields" });

    const user = await User.findOne({ mobileNo });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Password is InCorrect" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, mobileNo: user.mobileNo },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error while Login", Error: err?.message });
  }
};

const authControllers = { loginUser, registerUser };

export default authControllers;
