import axiosInstance from "../../utilus/axiosInstance";
import toast from "react-hot-toast";

export const handleFetchCart = async (token) => {
  if (!token) return [];
  try {
    const res = await axiosInstance.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res?.data?.data?.items || [];
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to fetch cart");
    throw err;
  }
};

export const handleUpdateQuantity = async (token, productId, quantity) => {
  try {
    const res = await axiosInstance.put(
      "/cart/update",
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res?.data?.data?.items || [];
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to update quantity");
    throw err;
  }
};

export const handleRemoveItem = async (token, productId) => {
  try {
    const res = await axiosInstance.delete(`/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Item removed from cart");
    return res?.data?.data?.items || [];
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to remove item");
    throw err;
  }
};

export const handleAddToCart = async (token, productId, quantity) => {
  if (!token) throw new Error("No token found");
  try {
    const res = await axiosInstance.post(
      "/cart/add",
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success(`${quantity} item(s) added to cart`);
    return res?.data?.data?.items || [];
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to add item");
    throw err;
  }
};
