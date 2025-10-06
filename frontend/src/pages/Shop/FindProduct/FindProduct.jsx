import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";

const FindProduct = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setcategoryFilter] = useState(
    location?.state?.categoryType || ""
  );
  const [sortBy, setSortBy] = useState("");
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categorys = [
    "Pain Relief",
    "Antibiotics",
    "Vitamins & Supplements",
    "Cold & Flu",
    "Skin Care",
    "First Aid",
    "Diabetes Care",
    "Digestive Health",
  ];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter) params.category = categoryFilter;

      const res = await axiosInstance.get("/products/find", { params });
      let sortedProducts = [...res.data.data];

      if (sortBy === "price-desc") sortedProducts.sort((a, b) => b.price - a.price);
      else if (sortBy === "price-asc") sortedProducts.sort((a, b) => a.price - b.price);

      setProducts(sortedProducts);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryFilter, sortBy]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  return (
    <div className="container mx-auto px-4 md:px-8">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar
        categoryFilter={categoryFilter}
        setcategoryFilter={setcategoryFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categorys={categorys}
      />
      <ProductGrid
        loading={loading}
        error={error}
        products={Products}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
      />
    </div>
  );
};

export default FindProduct;
