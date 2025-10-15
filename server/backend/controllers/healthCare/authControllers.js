import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/healthCare/userModel.js";
import { checkOtp, sendOtp } from "../../config/twilioConfig.js";


export const sendOtpController = async (req, res) => {
  try {
    const { mobileNo } = req.body;
    if (!mobileNo) return res.status(400).json({ message: "Mobile number required" });

    const user = await User.findOne({ mobileNo });
    if (user) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    const response = await sendOtp(`+91${mobileNo}`);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending OTP", error: error.message });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { mobileNo, otp, name, password, role } = req.body;
    if (!mobileNo || !otp || !name || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const isVerified = await checkOtp(`+91${mobileNo}`, otp);
    if (!isVerified) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const existingUser = await User.findOne({ mobileNo })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobileNo,
      password: hashedPassword,
      role,
      isVerified: true,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        mobileNo: user.mobileNo,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const { mobileNo, name, password, role } = req.body;
//     if (!mobileNo || !name || !password || !role)
//       return res.status(400).json({ message: "All fields are required" });


//     const existingUser = await User.findOne({ mobileNo })
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       mobileNo,
//       password: hashedPassword,
//       role,
//     });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         mobileNo: user.mobileNo,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error verifying OTP",
//       error: error.message,
//     });
//   }
// };

export const loginUser = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    if (!mobileNo || !password)
      return res.status(400).json({ message: "Mobile number and password required" });

    const user = await User.findOne({ mobileNo });
    if (!user) return res.status(404).json({ message: "User not found" });

    // if (!user.isVerified)
    //   return res.status(403).json({ message: "Please verify your number first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        mobileNo: user.mobileNo,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
