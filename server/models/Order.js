import mongoose from "mongoose";

const schema = new mongoose.Schema({

    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },

    orderItems: {
        chessBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        vegChessBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        BurgerWithFries: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },

    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },

    paidAt: Date,

    itemsPrice: {
        type: Number,
        default: 0
    },

    taxPrice: {
        type: Number,
        default: 0
    },

    shippingCharges: {
        type: Number,
        default: 0
    },

    totalAmount: {
        type: Number,
        default: 0
    },

    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing"
    },

    deliveredAt: Date,

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model("Order", schema);

export default Order;