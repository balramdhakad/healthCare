import Product from "../../models/ecommerce/productModel.js";

//all products list
export const getPropducts = async (req, res) => {
  try {
    const products = await Product.find()
      .limit(10)
      .select("name description price image_url");
    const bestSellers = await Product.find({ isBestSeller: true })
      .limit(10)
      .select("name description price image_url");
    if (!products) {
      res.status(404).json({
        message: `products not found `,
      });
    }

    res.status(200).json({
      success: true,
      data: { products, bestSellers },
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
      generic_name,
      dosage,
      form,
      description,
      price,
      category,
      stock_quantity,
      manufacturer,
      brand,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !stock_quantity ||
      !manufacturer
    ) {
      res.status(201).json(`please Fill All Details`);
    }

    const image_url = req.file?.path || null;

    const newProduct = new Product({
      name,
      generic_name,
      brand,
      dosage,
      form,
      description,
      price,
      stock_quantity,
      image_url,
      category,
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
    console.log(productId);
    const updates = req.body;

    if (req.file) {
      updates.image_url = req.file?.path;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
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
    const { category, search } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { generic_name: { $regex: new RegExp(search, "i") } },
        { brand: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { manufacturer: { $regex: new RegExp(search, "i") } }
      ];
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json({
      success: true,
      message: "product by category fetch success",
      data : products,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server error while fetch product by category.",
      Error: error?.message,
    });
  }
};

//seed

export const seedProducts = async () => {
  try {
    const result = await Product.insertMany(productData);
    console.log(`${result.length} products inserted successfully!`);
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
