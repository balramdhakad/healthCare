import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./backend/config/DBConfig.js";
import authRoutes from "./backend/routes/healthCare/authRoutes.js";
import patientRoute from "./backend/routes/healthCare/patientRoutes.js";
import doctorRoute from "./backend/routes/healthCare/doctorRoutes.js";
import appointmentRoutes from "./backend/routes/healthCare/appoinmentRoutes.js";
import generalRoutes from "./backend/routes/healthCare/generalRoutes.js";
import community from "./backend/routes/community/communityRoutes.js";
import chatRoutes from "./backend/routes/chats/chatRoutes.js";
import productRoutes from "./backend/routes/ecommerce/productRoutes.js";
import socketExports from "./backend/config/socket.js";

const { app, server } = socketExports;

// const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/community", community);
app.use("/api/chat", chatRoutes);
app.use("/api/products", productRoutes);

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ${PORT}`);
});
