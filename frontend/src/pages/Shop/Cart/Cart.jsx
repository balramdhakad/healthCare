import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchCart,
  updateCartQuantity,
  removeCartItem,
} from "../../../features/cart/cartSlice";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import LoadingBar from "../../../components/LoadingBar";
import CheckoutPage from "../Checkout/CheckoutPage";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const [isCheckOut, setIsCheckOut] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [token, dispatch]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  const handleRemove = (productId) => {
    if (!window.confirm("Remove this item from cart?")) return;
    dispatch(removeCartItem(productId));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 50 : 0;
  const taxes = subtotal * 0.05;
  const total = subtotal + shipping + taxes;

  const handleCheckoutbtn = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setIsCheckOut(true);
  };

  if (isLoading) return <LoadingBar />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!isCheckOut ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          <div className="lg:flex gap-6">
            <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-x-auto">
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
                      <td
                        colSpan={4}
                        className="text-center py-6 text-gray-500"
                      >
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
              handleCheckoutbtn={handleCheckoutbtn}
            />
          </div>
        </>
      ) : (
        <CheckoutPage
          cartItems={cartItems}
          total={total}
          setIsCheckOut={setIsCheckOut}
        />
      )}
    </div>
  );
};

export default Cart;
