import Product from "../../models/ecommerce/productModel.js";

//all products list
export const getPropducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({
        message: `products not found `,
      });
    }

    res.status(200).json({
      success: true,
      data: products,
      message: `product fetch success`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error while fetch products`,
      Error: error?.message,
    });
  }
};

//get single productById
export const getproductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json(`product not found`);
    }
    res.status(200).json({
      success: true,
      data: product,
      message: `product fetch success`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error while fetch products`,
      Error: error?.message,
    });
  }
};

// add product only by admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stockQuantity,
      isPrescriptionRequired,
      manufacturer,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stockQuantity ||
      !isPrescriptionRequired ||
      !manufacturer
    ) {
      res.status(201).json(`please Fill All Details`);
    }

    const imageUrl = req.file.path || null;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stockQuantity,
      isPrescriptionRequired,
      manufacturer,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "product added", data: savedProduct });
  } catch (error) {
    res.status(500).json({
      message: "Server error while add product .",
      Error: error?.message,
    });
  }
};

//update product only by admin
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while update product .",
      Error: error?.message,
    });
  }
};

//delete product only by admin
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      res.status(404).json(`product not found`);
    }
    res.status(200).json({
      success: true,
      message: `product deleted success`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error while delete products`,
      Error: error?.message,
    });
  }
};

//product by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Category query is required." });
    }

    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json({
      success: true,
      message: "product by category fetch success",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error while fetch product by category.",
        Error: error?.message,
      });
  }
};
