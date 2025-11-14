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
    <div className="hidden md:grid grid-cols-7 font-semibold border-b p-4 text-gray-700 bg-gray-50">
      <span>IMAGE</span>
      <span>NAME</span>
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
            className="border-b p-4 hover:bg-gray-50 transition flex flex-col md:grid md:grid-cols-7 md:items-center"
          >

            <div className="flex items-center space-x-4">
              <img
                src={p.image_url || ""}
                alt={p.name}
                className="w-12 h-12 object-cover rounded"
              />

              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-800 flex items-center">
                  {p.name}
                  {p.isBestSeller && (
                    <FaStar
                      className="text-yellow-500 ml-2"
                      title="Best Seller"
                    />
                  )}
                </span>

                <div className="md:hidden text-gray-500 text-sm mt-1">
                  {p.category} | ₹{p.price.toFixed(2)} | {p.stock_quantity} in
                  stock
                </div>
              </div>
            


            <span className="hidden md:block text-gray-600 text-sm">
              {p.category}
            </span>
            <span className="hidden md:block text-gray-600 text-sm">
              ₹{p.price.toFixed(2)}
            </span>
            <span className="hidden md:block text-gray-600 text-sm">
              {p.stock_quantity} in stock
            </span>
            <span className="hidden md:block text-gray-600 text-sm">
              {p.manufacturer}
            </span>

 
            <div className="flex justify-end space-x-2 mt-2 md:mt-0">
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
