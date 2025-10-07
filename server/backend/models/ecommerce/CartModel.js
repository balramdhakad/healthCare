import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },
    price_at_add: { 
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    }
}, {
    _id: false
});



const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [CartItemSchema],
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart