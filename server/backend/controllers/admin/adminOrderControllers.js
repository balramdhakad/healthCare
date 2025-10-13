import mongoose from "mongoose";
import Order, {
  OrderStatus,
  PaymentStatus,
} from "../../models/ecommerce/OrderModel.js";

const createOrderFilter = (query) => {
  const { orderStatus, paymentStatus, search } = query;
  const filter = {};

  if (orderStatus && Object.values(OrderStatus).includes(orderStatus)) {
    filter.order_status = orderStatus;
  }

  if (paymentStatus && Object.values(PaymentStatus).includes(paymentStatus)) {
    filter.payment_status = paymentStatus;
  }

  if (search && search.trim() !== "") {
    const orConditions = [];

    if (mongoose.Types.ObjectId.isValid(search)) {
      orConditions.push({ _id: search });
      orConditions.push({ user_id: search });
    }


    if (orConditions.length) filter.$or = orConditions;
  }

  return filter;
};

export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = createOrderFilter(req.query);

    const orders = await Order.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate("user_id", "name email")
      .lean();

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalOrders / limit),
      totalResults: totalOrders,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching orders.",
      Error: error?.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { order_status, payment_status } = req.body;
    const updateFields = {};

    if (order_status && Object.values(OrderStatus).includes(order_status)) {
      updateFields.order_status = order_status;
    }

    if (
      payment_status &&
      Object.values(PaymentStatus).includes(payment_status)
    ) {
      updateFields.payment_status = payment_status;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid status fields provided for update.",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, {
      new: true,
      runValidators: true,
    }).populate("user_id", "name email");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error updating order status.",
      Error: error.message,
    });
  }
};
