
import  mongoose from "mongoose"
import ProductCategory from "./productCategory.js"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot be more than 100 characters"],
    },
    generic_name: {
      type: String,
      trim: true,
      maxlength: [100, "Generic name cannot be more than 100 characters"],
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [50, "Brand name cannot be more than 50 characters"],
    },
    dosage: {
      type: String,
      trim: true,
      maxlength: [50, "Dosage cannot be more than 50 characters"],
    },
    form: {
      type: String,
      trim: true,
      maxlength: [50, "Form cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [
        1000,
        "Product description cannot be more than 1000 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
      get: (v) => parseFloat(v.toFixed(2)),
      set: (v) => parseFloat(v.toFixed(2)),
    },
    stock_quantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    image_url: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: [true, "Product category is required"],
      default: ProductCategory.OTHER,
    },
    manufacturer: {
      type: String,

      required: true,
    },

  },
  {
    timestamps: true,
  }
);

ProductSchema.path("price").get(function (num) {
  return (num / 100).toFixed(2);
});
ProductSchema.path("price").set(function (num) {
  return num * 100;
});

const Product = mongoose.model("Product", ProductSchema);

export default Product
