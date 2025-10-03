import Address, { AddressType } from "../../models/ecommerce/AddressModel.js";
import mongoose from "mongoose";

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
    res
      .status(201)
      .json({
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
