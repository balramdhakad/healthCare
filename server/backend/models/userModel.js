import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role : {
        type : String,
        enum : ["doctor","patient","admin"],
        require : true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User
