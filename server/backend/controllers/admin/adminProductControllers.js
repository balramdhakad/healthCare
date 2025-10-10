import Product from "../../models/ecommerce/productModel.js";

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

const createProductFilter = (query) => {
  const { category, isBestSeller, search } = query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (isBestSeller === "true") {
    filter.isBestSeller = true;
  } else if (isBestSeller === "false") {
    filter.isBestSeller = false;
  }

  if (search) {
    const orConditions = [
      { name: { $regex: new RegExp(search, "i") } },
      { generic_name: { $regex: new RegExp(search, "i") } },
      { brand: { $regex: new RegExp(search, "i") } },
      { manufacturer: { $regex: new RegExp(search, "i") } },
    ];

    if (Object.keys(filter).length > 0) {
      return { $and: [filter, { $or: orConditions }] };
    } else {
      return { $or: orConditions };
    }
  }

  return filter;
};

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = createProductFilter(req.query);

    const products = await Product.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();
    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalResults: totalProducts,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching products.",
      Error: error.message,
    });
  }
};
