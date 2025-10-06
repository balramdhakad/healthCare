
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const fetchCart = async () => {
    setLoading(true);
    if (!token) return;
    try {
      const response = await axiosInstance.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response?.data?.data?.items || []);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await axiosInstance.put(
        "/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res?.data?.data?.items || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axiosInstance.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res?.data?.data?.items || []);
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="lg:flex gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <table className="w-full">
            <thead className="text-left border-b">
              <tr>
                <th className="pb-2">Product</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.product_id._id}
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    handleRemove={handleRemove}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Your cart is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          taxes={taxes}
          total={total}
        />
      </div>
    </div>
  );
};

export default Cart;
