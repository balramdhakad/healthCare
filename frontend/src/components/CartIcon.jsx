
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { fetchCart } from "../features/cart/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  useEffect(() => {
    if (cartItems?.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [cartItems?.length]);

  return (
    <Link
      to="/cart"
      className={`relative text-gray-700 hover:text-blue-600 transition ${animate ? "animate-shake" : ""}`}
    >
      <IoCart size={40} />
      <span className="absolute -top-1 -left-1 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
        {cartItems?.length || 0}
      </span>
    </Link>
  );
};

export default CartIcon;
