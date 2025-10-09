import React, { useState } from "react";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, removeCartItem } from "../../../../features/cart/cartSlice";


const ProductActions = ({ product, isInCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increment" && prev < product.stock_quantity) return prev + 1;
      if (type === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = async () => {
    if (!token) return toast.error("Please login to add items to cart.");
    setIsAdding(true);
    try {
      await dispatch(addToCart({ productId: product._id, quantity })).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!token) return toast.error("Please login to modify cart.");
    try {
      await dispatch(removeCartItem(product._id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 border-t pt-6">

      <div className="flex items-center bg-gray-100 rounded-lg p-2">
        <button
          onClick={() => handleQuantityChange("decrement")}
          disabled={quantity <= 1 || isAdding}
          className="p-2 text-teal-600 hover:bg-gray-200 rounded-full disabled:opacity-50"
        >
          <FaMinus />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= product.stock_quantity) setQuantity(val);
          }}
          className="w-16 text-center bg-transparent text-lg font-semibold"
        />

        <button
          onClick={() => handleQuantityChange("increment")}
          disabled={
            quantity >= product.stock_quantity ||
            isAdding ||
            product.stock_quantity === 0
          }
          className="p-2 text-teal-600 hover:bg-gray-200 rounded-full disabled:opacity-50"
        >
          <FaPlus />
        </button>
      </div>

      {isInCart ? (
        <button
          onClick={handleRemoveFromCart}
          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
        >
          <FaTrash className="w-5 h-5 mr-3" />
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0 || isAdding}
          className={`flex items-center justify-center font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg ${
            product.stock_quantity === 0 || isAdding
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          <FaShoppingCart className="w-5 h-5 mr-3" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductActions;
