import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const placeOrder = asyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
    } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
    }

    const newOrder = await Order.create(orderOptions);

    res.status(201).json({
        success: true,
        message: "Order Placed Successfully via cash on delivery",
        newOrder
    });
});

export const getOrders = asyncError(async (req, res, next) => {

    const orders = await Order.find({
        user: req.user._id
    }).populate("user", "name");

    res.status(200).json({
        success: true,
        orders
    });
});

export const getOrderDetails = async (req, res, next) => {

    let document;

    try {
        document = await Order.findOne({ _id: req.params.id }).populate("user", "name");

    } catch (error) {
        return next(new ErrorHandler("Invalid Order Id", 404));
    }

    res.status(200).json({
        success: true,
        document
    });
};

export const getAdminOrders = asyncError(async (req, res, next) => {

    const orders = await Order.find().populate("user", "name");

    res.status(200).json({
        success: true,
        orders
    });
});

export const processOrder = async (req, res, next) => {

    try {
        let order = await Order.findOne({ _id: req.params.id });

        if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

        if (order.orderStatus === "Preparing") {
            order.orderStatus = "Shipped";
        } else if (order.orderStatus === "Shipped") {
            order.orderStatus = "Delivered";
            order.deliveredAt = Date.now();
        } else if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("Food Already Delivered", 404));
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully"
        });
    } catch (error) {
        return next(new ErrorHandler("Invalid Order Id", 404));
    }
};

export const placeOrderOnline = asyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
    } = req.body;

    const user = req.user._id;

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
    }

    const options = {
        amount: Number(totalAmount) * 100,
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(201).json({
        success: true,
        order,
        orderOptions
    });
});

export const paymentVerification = async (req, res, next) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');

        console.log(razorpay_signature == expectedSignature);

    if (razorpay_signature == expectedSignature) {

        const payment = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        const newOrder = await Order.create({
            ...orderOptions,
            user: req.user._id,
            paidAt: new Date(Date.now()),
            paymentInfo: payment._id
        });

        res.status(201).json({
            success: true,
            message: `Order placed successfully, Payment ID: ${payment._id}`,
            newOrder
        });

    } else {
        return next(new ErrorHandler("Payment Failed", 400));
    }
} 