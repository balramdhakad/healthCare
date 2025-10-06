import React from "react";
import ProductCard from "../../Ordernow/components/ProductCard";
import LoadingBar from "../../../../components/LoadingBar";

const ProductGrid = ({ loading, error, products, searchTerm, categoryFilter }) => (
  <div className="mt-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
      {searchTerm || categoryFilter ? "Search Results" : "All Products"}
    </h2>

    {loading ? (
      <div className="text-center py-10 text-gray-500">
        <LoadingBar />
      </div>
    ) : error ? (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    ) : products.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500">
        <p>No Products found. Try different keywords or filters.</p>
      </div>
    )}
  </div>
);

export default ProductGrid;
