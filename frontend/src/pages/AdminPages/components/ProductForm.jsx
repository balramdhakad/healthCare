import React, { useState } from "react";
import { initialProductState, productCategories } from "./productConstants";

const ProductForm = ({ product, onClose, onSubmit }) => {
  const isEditing = !!product?._id;

  const [formData, setFormData] = useState({
    ...initialProductState,
    ...(product || {}),
    price: product?.price?.toString() || initialProductState.price.toString(),
    stock_quantity:
      product?.stock_quantity?.toString() ||
      initialProductState.stock_quantity.toString(),
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image_url || null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "_id" && key !== "image_url") {
        data.append(key, formData[key]);
      }
    });
    if (imageFile) data.append("image_url", imageFile);
    onSubmit(data, product?._id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative animate-fadeIn">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
          {isEditing ? "Edit Product" : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Product Info */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name *"
              required
              autoFocus
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="generic_name"
              placeholder="Generic Name"
              value={formData.generic_name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price *"
              required
              value={formData.price}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              name="stock_quantity"
              placeholder="Stock Quantity *"
              required
              value={formData.stock_quantity}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category & Manufacturer */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="" disabled>
                Select Category *
              </option>
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="manufacturer"
              placeholder="Manufacturer *"
              required
              value={formData.manufacturer}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Dosage & Form */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="form"
              placeholder="Form"
              value={formData.form}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description *"
            required
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {isEditing && formData.image_url ? "Change Image:" : "Upload Image:"}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                name="image_url"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 
                  file:mr-4 file:py-2 file:px-4 file:rounded-full 
                  file:border-0 file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover border"
                />
              )}
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={formData.isBestSeller}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Best Seller</span>
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
