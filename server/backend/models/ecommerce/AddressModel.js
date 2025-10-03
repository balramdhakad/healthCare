import mongoose from "mongoose";

const AddressType = Object.freeze({
  SHIPPING: "shipping",
  BILLING: "billing",
  RESIDENTIAL: "residential",
  COMMERCIAL: "commercial",
});

const AddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address_line1: {
      type: String,
      required: [true, "Address line 1 is required"],
      trim: true,
      maxlength: [100, "Address line 1 cannot exceed 100 characters"],
    },
    address_line2: {
      type: String,
      trim: true,
      maxlength: [100, "Address line 2 cannot exceed 100 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    state: {
      type: String,
      required: [true, "State/Province is required"],
      trim: true,
      maxlength: [50, "State/Province name cannot exceed 50 characters"],
    },
    zip_code: {
      type: String,
      required: [true, "Zip/Postal code is required"],
      trim: true,
      maxlength: [10, "Zip/Postal code cannot exceed 10 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "India",
      maxlength: [50, "Country name cannot exceed 50 characters"],
    },
    phone_number: {
      type: String,
      trim: true,
      minlength: [10, "Phone number cannot less then 10 characters"],
      maxlength: [10, "Phone number cannot exceed 10 characters"],
    },
    is_default: {
      type: Boolean,
      default: false,
    },
    address_type: {
      type: String,
      enum: Object.values(AddressType),
      default: AddressType.RESIDENTIAL,
    },
  },
  {
    timestamps: true,
  }
);

export { AddressType };

const Address = mongoose.model("Address", AddressSchema);

export default Address;
