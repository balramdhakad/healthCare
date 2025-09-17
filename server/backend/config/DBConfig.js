import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Dataase Connection Success : ${conn.connection.name}`);
  } catch (error) {
    console.log(`Database Connection Failed : ${error?.message}`);
  }
};

export default connectDB;
