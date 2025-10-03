import mongoose from "mongoose";


const OrderStatus = Object.freeze({
    PENDING: "Pending",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    REFUNDED: "Refunded"
});

const PaymentStatus = Object.freeze({
    PENDING: "Pending",
    PAID: "Paid",
    FAILED: "Failed",
    REFUNDED: "Refunded"
});

const OrderItemSchema = new mongoose.Schema({
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
    unit_price: {
        type: Number,
        required: true,
        min: [0, 'Unit price cannot be negative'],
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    subtotal: {
        type: Number,
        required: true,
        min: [0, 'Subtotal cannot be negative'],
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    }
}, {
    _id: false
});

OrderItemSchema.path('unit_price').get(function (num) {
    return (num / 100).toFixed(2);
});
OrderItemSchema.path('unit_price').set(function (num) {
    return num * 100;
});
OrderItemSchema.path('subtotal').get(function (num) {
    return (num / 100).toFixed(2);
});
OrderItemSchema.path('subtotal').set(function (num) {
    return num * 100;
});


const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    total_amount: { 
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be negative'],
        get: v => parseFloat(v.toFixed(2)),
        set: v => parseFloat(v.toFixed(2))
    },
    order_status: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING,
        required: true
    },
    payment_status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
        required: true
    },
    shipping_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: [true, 'Shipping address is required']
    },
    billing_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: [true, 'Billing address is required']
    },

    payment_method: { 
        type: String,
        trim: true,
        maxlength: [50, 'Payment method cannot be more than 50 characters']
    }
}, {
    timestamps: true
});

export { OrderStatus, PaymentStatus }
const Order = mongoose.model('Order', OrderSchema);

export default Order