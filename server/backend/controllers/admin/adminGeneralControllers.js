import Community from "../../models/community/communityModel.js";
import Order from "../../models/ecommerce/OrderModel.js";
import Product from "../../models/ecommerce/productModel.js";
import Appointment from "../../models/healthCare/appointmentModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";

export const getDashboardCounts = async (req, res) => {
  try {
    const [orders, doctors, appointments, products, community] = await Promise.all([
      Order.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Product.countDocuments(),
      Community.countDocuments(),
    ]);

    res.status(200).json({
      orders,
      doctors,
      appointments,
      products,
      community,
    });
  } catch (error) {

    res.status(500).json({ message: "Failed to fetch counts" });
  }
};