import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItem = ({ item, handleQuantityChange, handleRemove }) => {
  const { product_id, quantity } = item;

  return (
    <tr className="border-b">
      <td className="py-4 flex items-center gap-3">
        <img
          src={product_id?.image_url}
          alt={product_id?.name}
          className="w-12 h-12 rounded bg-gray-100 object-cover"
        />
        <div>
          <Link to={`/shop/product/${product_id?._id}`} className="font-medium">{product_id?.name}</Link>
          <p className="text-gray-500">₹{product_id?.price}</p>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(product_id?._id, quantity - 1)}
            className="p-1 bg-gray-100 rounded disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(product_id?._id, parseInt(e.target.value))
            }
            className="w-12 text-center border rounded"
          />
          <button
            onClick={() => handleQuantityChange(product_id?._id, quantity + 1)}
            className="p-1 bg-gray-100 rounded"
          >
            <FaPlus />
          </button>
        </div>
      </td>

      <td>₹{(product_id?.price * quantity).toFixed(2)}</td>
      <td>
        <button
          onClick={() => handleRemove(product_id?._id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
