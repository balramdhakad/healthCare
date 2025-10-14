import jwt from "jsonwebtoken";
import User from "../models/healthCare/userModel.js";

const auth = (...requiredRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token format is invalid" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!requiredRole.includes(user.role)) {
        return res
          .status(403)
          .json({ message: `Access denied. You must be a ${requiredRole}.` });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired, please log in again." });
      }
      return res
        .status(500)
        .json({
          message: "Authentication failed at auth Middleware",
          Error: error,
        });
    }
  };
};

export default auth;
