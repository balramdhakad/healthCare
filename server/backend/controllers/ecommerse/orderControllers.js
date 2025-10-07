import Order, {
  OrderStatus,
  PaymentStatus,
} from "../../models/ecommerce/OrderModel.js";
import Cart from "../../models/ecommerce/CartModel.js";
import Product from "../../models/ecommerce/productModel.js";
import Address from "../../models/ecommerce/AddressModel.js";
import mongoose from "mongoose";

const _decrementStock = async (productId, quantity, session) => {
  const product = await Product.findById(productId).session(session);
  if (!product || product.stock_quantity < quantity) {
    throw new Error(`Insufficient stock for product ID: ${productId}`);
  }
  product.stock_quantity -= quantity;
  await product.save({ session });
  return product;
};

const _incrementStock = async (productId, quantity, session) => {
  const product = await Product.findById(productId).session(session);
  if (!product) {
    throw new Error(
      `Product not found for stock increment for ID: ${productId}`
    );
  }
  product.stock_quantity += quantity;
  await product.save({ session });
  return product;
};

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const { shippingAddressId, billingAddressId, paymentMethod } = req.body;

    if (!shippingAddressId || !billingAddressId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message:
          "Shipping address, billing address, and payment method are required.",
      });
    }
    if (
      !mongoose.Types.ObjectId.isValid(shippingAddressId) ||
      !mongoose.Types.ObjectId.isValid(billingAddressId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address ID format." });
    }
    const cart = await Cart.findOne({ user_id: userId })
      .populate("items.product_id")
      .session(session);
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message:"Cannot place an order with an empty cart."});
    }

    const shippingAddress = await Address.findOne({
      _id: shippingAddressId,
      user_id: userId,
    }).session(session);
    const billingAddress = await Address.findOne({
      _id: billingAddressId,
      user_id: userId,
    }).session(session);
    if (!shippingAddress || !billingAddress) {
      return res.status(401).json({
        message :"Invalid shipping or billing address, or address does not belong to your account.",
      })
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.product_id;
      const requestedQuantity = cartItem.quantity;

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${cartItem.product_id._id} not found in database.`,
        });
      }
      if (product.stock_quantity < requestedQuantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}, Requested: ${requestedQuantity}`,
        });
      }

      orderItems.push({
        product_id: product._id,
        quantity: requestedQuantity,
        unit_price: product.price,
        subtotal: requestedQuantity * product.price,
      });
      totalAmount += requestedQuantity * product.price;

      await _decrementStock(product._id, requestedQuantity, session);
    }

    const newOrder = new Order({
      user_id: userId,
      items: orderItems,
      total_amount: totalAmount,
      order_status: OrderStatus.PENDING,
      payment_status: PaymentStatus.PENDING,
      shipping_address_id: shippingAddressId,
      billing_address_id: billingAddressId,
      payment_method: paymentMethod,
    });
    await newOrder.save({ session });

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    await newOrder.populate("items.product_id");
    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      data: newOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format." });
    }

    const orders = await Order.find({ user_id: userId })
      .populate("items.product_id")
      // .populate("shipping_address_id")
      // .populate("billing_address_id")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetch all orders ",
      Error: error?.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const order = await Order.findOne({ _id: orderId, user_id: userId })
      .populate("items.product_id")
      .populate("shipping_address_id")
      .populate("billing_address_id");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or does not belong to your account.",
      });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetch order",
      Error: error?.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const orderId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const order = await Order.findOne({
      _id: orderId,
      user_id: userId,
    }).session(session);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Does Not Found or Not Belongs to User.",
      });
    }

    if (
      [
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
        OrderStatus.REFUNDED,
      ].includes(order.order_status)
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel an order with status: ${order.order_status}.`,
      });
    }

    for (const item of order.items) {
      await _incrementStock(item.product_id, item.quantity, session);
    }

    order.order_status = OrderStatus.CANCELLED;
    order.payment_status = PaymentStatus.REFUNDED;
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      data: order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, message: error.message });
  }
};

//Only ADmin Controllers
export const updateOrderStatusAdmin = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID format." });
    }
    if (!status || !Object.values(OrderStatus).includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Valid order status is required." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { order_status: status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
    res.status(200).json({
      success: true,
      message: "Order status updated.",
      data: updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error while update status" , Error : error.message });
  }
};

export const updatePaymentStatusAdmin = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID format." });
    }
    if (!status || !Object.values(PaymentStatus).includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Valid payment status is required." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { payment_status: status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }
    res.status(200).json({
      success: true,
      message: "Payment status updated.",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while update paymewnt status ",
      Error: error?.message,
    });
  }
};
