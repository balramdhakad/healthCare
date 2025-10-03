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
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    }
}, {
    _id: false
});


CartItemSchema.path('price_at_add').get(function (num) {
    return (num / 100).toFixed(2);
});
CartItemSchema.path('price_at_add').set(function (num) {
    return num * 100;
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