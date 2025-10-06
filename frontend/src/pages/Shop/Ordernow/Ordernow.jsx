import React from "react";
import CategoryCard from "./components/CategoryCard";
import image from "../../../assets/image.png";
import ProductCard from "./components/ProductCard";
import { useState } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";
import { useEffect } from "react";
import LoadingBar from "../../../components/LoadingBar";
import { HeroSection } from "./components/HeroSection";

const featuredCategories = [
  {
    name: "Pain Relief",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740250/Gemini_Generated_Image_kj26zhkj26zhkj26_vwyo3c.png",
  },
  {
    name: "Antibiotics",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740371/Gemini_Generated_Image_kj26zhkj26zhkj26_1_slr4qp.png",
  },
  {
    name: "Vitamins & Supplements",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740117/vitamin_ksmvgw.png",
  },
  {
    name: "Cold & Flu",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740731/Gemini_Generated_Image_76dgzt76dgzt76dg_wpndhg.png",
  },
  {
    name: "Skincare & Personal Care",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740895/skincare_xvpbxp.png",
    displayName: "Skincare & Personal Care",
  },
  {
    name: "First Aid",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759740933/Gemini_Generated_Image_dmvlzodmvlzodmvl_a8o9ja.png",
  },
  {
    name: "Diabetes Care",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759741084/Gemini_Generated_Image_ix9vqix9vqix9vqi_waory1.png",
  },
  {
    name: "Digestive Health",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759741260/Gemini_Generated_Image_jexuc2jexuc2jexu_n8gymr.png",
  },
  {
    name: "Home Fitness Essentials",
    image_url:
      "https://res.cloudinary.com/dvnopinko/image/upload/v1759741293/Gemini_Generated_Image_xqdhpfxqdhpfxqdh_ebnn2b.png",
    displayName: "Home Fitness Essentials",
  },
];

const OrderNow = () => {
  const [product, setProduct] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setProduct(response?.data?.data?.products);
      setBestSeller(response?.data?.data?.bestSellers);
    } catch (error) {
      toast.error(error?.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) <LoadingBar />;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 mt-8">
        <HeroSection image={image} />
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Product Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {product.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestSeller.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderNow;
