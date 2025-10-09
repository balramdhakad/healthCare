
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingBar from "../../../components/LoadingBar";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductDescription from "./components/ProductDescription";
import axiosInstance from "../../../utilus/axiosInstance";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { userdata } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const token = userdata?.token;


  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();

  }, [id, token]);

  if (loading) return <LoadingBar />;
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );

  const isInCart = cartItems.some((item) => item.product_id._id === product._id);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-teal-600 hover:text-teal-800 mb-6 transition duration-150"
        >
          <FaArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden lg:flex lg:space-x-8 p-6 lg:p-10">
          <ProductImage image_url={product.image_url} name={product.name} />
          <ProductInfo
            product={product}
            isInCart={isInCart}
            token={token}
            setCart={setCart}
          />
        </div>

        <ProductDescription description={product.description} />
      </div>
    </div>
  );
};

export default ProductDetail;