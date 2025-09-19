import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: [String],
    default: []
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  isPrescriptionRequired: {
    type: Boolean,
    default: false
  },
  manufacturer: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;