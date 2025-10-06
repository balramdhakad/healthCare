import Address, { AddressType } from "../../models/ecommerce/AddressModel.js";
import mongoose from "mongoose";


// Create Address
export const createAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      address_line1,
      city,
      state,
      zip_code,
      country,
      phone_number,
      address_type,
    } = req.body;
    if (
      !address_line1 ||
      !city ||
      !state ||
      !zip_code ||
      !country ||
      !phone_number ||
      !address_type
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All address fields (line1, city, state, zip, country, phone, type) are required.",
      });
    }
    if (!Object.values(AddressType).includes(address_type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address type provided." });
    }

    const newAddress = new Address({ ...req.body, user_id: userId });
    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
      message: "address created succes",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while create address ",
      Error: error.message,
    });
  }
};

// Get Addresses
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format." });
    }
    const addresses = await Address.find({ user_id: userId }).sort({
      is_default: -1,
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, count: addresses.length, data: addresses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while get addresses ",
      Error: error.message,
    });
  }
};

//Get Address
export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(addressId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const address = await Address.findOne({ _id: addressId, user_id: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found or does not belong to your account.",
      });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while get single address ",
      Error: error?.message,
    });
  }
};



//Update Address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const updateData = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(addressId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    delete updateData.user_id;
    delete updateData._id;

    if (
      updateData.address_type &&
      !Object.values(AddressType).includes(updateData.address_type)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address type provided." });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user_id: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found or does not belong to your account.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address is updateed",
      data: updatedAddress,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({
      success: false,
      message: "Server Error while update address  ",
      Error: error.message,
    });
  }
};

//delete address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(addressId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      user_id: userId,
    });
    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found or does not belong to your account.",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server Error while delete Address ",
        Error: error.message,
      });
  }
};

//set default Address
export const setDefaultAddress = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const { addressType = AddressType.SHIPPING } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(addressId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }
    if (!Object.values(AddressType).includes(addressType)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address type provided." });
    }

    await Address.updateMany(
      { user_id: userId, address_type: addressType, is_default: true },
      { $set: { is_default: false } },
      { session }
    );

    const address = await Address.findOneAndUpdate(
      { _id: addressId, user_id: userId, address_type: addressType },
      { $set: { is_default: true } },
      { new: true, session }
    );

    if (!address) {
      throw new Error(
        "Address not found, does not belong to your account, or type mismatch."
      );
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      success: true,
      message: "Address set as default.",
      data: address,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      success: false,
      message: "Failed to set default address while set default address ",
      Error: error.message,
    });
  }
};
