import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/healthCare/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { mobileNo, password, role, name } = req.body;

    if (!mobileNo || !password || !role || !name)
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
      name,
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
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while Register User",
      Error: error?.message,
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
      user: {
        id: user._id,
        mobileNo: user.mobileNo,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while Login",
      Error: error?.message,
    });
  }
};

const authControllers = { loginUser, registerUser };

export default authControllers;
