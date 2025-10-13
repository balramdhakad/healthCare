import React from "react";
import { FaEdit, FaTrashAlt, FaSort, FaStar } from "react-icons/fa";
import LoadingBar from "../../../../components/LoadingBar";

const ProductTable = ({
  products,
  loading,
  sortOrder,
  setSortOrder,
  onEdit,
  onDelete,
}) => {
  const TableHeader = () => (
    <div className="grid grid-cols-7 font-semibold border-b p-4 text-gray-700 bg-gray-50">
      <span>IMAGE</span>
      <span
        className="flex items-center space-x-1 cursor-pointer"
        onClick={() =>
          setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
        }
      >
        <span>NAME</span>
        <FaSort className="text-gray-500" />
      </span>
      <span>CATEGORY</span>
      <span>PRICE</span>
      <span>STOCK</span>
      <span>MANUFACTURER</span>
      <span className="text-right">ACTIONS</span>
    </div>
  );

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <TableHeader />
      {loading ? (
        <div className="flex justify-center items-center py-10 text-blue-600">
          <LoadingBar />
        </div>
      ) : products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="grid grid-cols-7 items-center border-b p-4 hover:bg-gray-50 transition"
          >
            <img
              src={p.image_url || "/placeholder.png"}
              alt={p.name}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="font-medium text-gray-800 truncate flex items-center">
              {p.name}{" "}
              {p.isBestSeller && (
                <FaStar className="text-yellow-500 ml-2" title="Best Seller" />
              )}
            </span>
            <span className="text-gray-600 text-sm">{p.category}</span>
            <span className="text-gray-600 text-sm">₹{p.price.toFixed(2)}</span>
            <span className="text-gray-600 text-sm">
              {p.stock_quantity} in stock
            </span>
            <span className="text-gray-600 text-sm">{p.manufacturer}</span>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onEdit(p)}
                className="p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(p)}
                className="p-2 rounded-full text-red-600 hover:bg-red-50 transition"
                title="Delete"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-6">No products found.</p>
      )}
    </div>
  );
};

export default ProductTable;
