import dotenv from "dotenv"
dotenv.config()
import express from "express";
import connectDB from "./backend/config/DBConfig.js";
import authRoutes from "./backend/routes/authRoutes.js"
import patientRoute from "./backend/routes/patientRoutes.js"
import doctorRoute from "./backend/routes/doctorRoutes.js"
import appointmentRoutes from "./backend/routes/appoinmentRoutes.js"
import generalRoutes from "./backend/routes/generalRoutes.js"
import community from "./backend/routes/community/communityRoutes.js"

const PORT = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/auth",authRoutes)
app.use("/api/patient",patientRoute)
app.use("/api/doctor",doctorRoute)
app.use("/api/appointment",appointmentRoutes)
app.use("/api/general",generalRoutes)
app.use("/api/community",community)

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING AT ${PORT}`)
})
