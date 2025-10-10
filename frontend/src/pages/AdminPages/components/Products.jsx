import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { initialProductState, productCategories } from "./productConstants";
import ProductForm from "./ProductForm";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";
import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import axiosInstance from "../../../utilus/axiosInstance";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [bestSellerFilter, setBestSellerFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const limit = 10;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit,
        search,
        category: categoryFilter,
        isBestSeller: bestSellerFilter === "all" ? "" : bestSellerFilter,
        sort: sortOrder,
      };
      const res = await axiosInstance.get("/admin/product", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, search, categoryFilter, bestSellerFilter, sortOrder]);

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  const handleSubmitProduct = async (formData, productId) => {
    try {
      const isEditing = !!productId;
      const url = isEditing ? `/admin/product/${productId}` : "/admin/product";
      const method = isEditing ? "put" : "post";
      await axiosInstance[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(
        `Product ${isEditing ? "updated" : "created"} successfully!`
      );
      setIsModalOpen(false);
      setCurrentProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product.");
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirmDelete) return;
    try {
      await axiosInstance.delete(`/admin/product/${confirmDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Product "${confirmDelete.name}" deleted successfully.`);
      setConfirmDelete(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed.");
    }
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <FilterBar
        search={search}
        categoryFilter={categoryFilter}
        productCategories={productCategories}
        onSearchChange={(value) => handleFilterChange(setSearch, value)}
        onCategoryChange={(value) =>
          handleFilterChange(setCategoryFilter, value)
        }
        onCreate={() => {
          setCurrentProduct(initialProductState);
          setIsModalOpen(true);
        }}
      />

      <ProductHeader
        bestSellerFilter={bestSellerFilter}
        onFilterChange={(value) =>
          handleFilterChange(setBestSellerFilter, value)
        }
      />

      <ProductTable
        products={products}
        loading={loading}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onEdit={(p) => {
          setCurrentProduct(p);
          setIsModalOpen(true);
        }}
        onDelete={(p) => setConfirmDelete({ id: p._id, name: p.name })}
      />

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {isModalOpen && (
        <ProductForm
          product={currentProduct}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitProduct}
        />
      )}
    </div>
  );
};

export default Products;
