import Cart from "../../models/ecommerce/CartModel.js";
import Product from "../../models/ecommerce/productModel.js";
import mongoose from "mongoose";

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID format." });
    }

    let cart = await Cart.findOne({ user_id: userId }).populate(
      "items.product_id"
    );
    if (!cart) {
      cart = await Cart.create({ user_id: userId, items: [] });
    }
    res.status(200).json({ success: true, data: cart});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while get user card ",
      Error: error.message,
    });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID and a positive quantity are required.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format." });
    }

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for user. Please try again later.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    if (product.stock_quantity === 0) {
      return res.status(400).json({
        success: false,
        message: `Product ${product.name} is out of stock.`,
      });
    }

    const existingItemIndex = cart.items.findIndex((item) =>
      item.product_id.equals(productId)
    );

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (product.stock_quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Adding ${quantity} exceeds available stock for ${
            product.name
          }. Max allowed: ${
            product.stock_quantity - cart.items[existingItemIndex].quantity
          }`,
        });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      if (product.stock_quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`,
        });
      }
      cart.items.push({
        product_id: productId,
        quantity: quantity,
        price_at_add: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product_id");
    res
      .status(200)
      .json({ success: true, message: "Product added to cart.", data: cart });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Server Error while addToCard ",
        Error: error.message,
      });
  }
};

export const updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Product ID and a non-negative quantity are required.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format." });
    }

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    const existingItemIndex = cart.items.findIndex((item) =>
      item.product_id.equals(productId)
    );

    if (existingItemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart." });
    }

    if (quantity === 0) {
      cart.items.splice(existingItemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Referenced product no longer exists.",
        });
      }
      if (product.stock_quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot update quantity to ${quantity}. Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`,
        });
      }
      cart.items[existingItemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product_id");
    res.status(200).json({
      success: true,
      message: "Cart item quantity updated.",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while update quantity ",
      Error: error?.message,
    });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID format." });
    }

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => !item.product_id.equals(productId)
    );

    if (cart.items.length === initialLength) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart." });
    }

    await cart.save();
    await cart.populate("items.product_id");
    res.status(200).json({
      success: true,
      message: "Product removed from cart.",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error ehile remove cart item ",
      Error: error?.message,
    });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found." });
    }

    cart.items = [];
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Cart cleared.", data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while clear cart ",
      Error: error?.message,
    });
  }
};
