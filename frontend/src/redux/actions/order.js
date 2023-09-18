import axios from "axios";
import { server } from "../store";


export const createOrder = (
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
) => async (dispatch) => {

    try {

        dispatch({
            type: "createOrderRequest"
        });

        await axios.post(`${server}/createOrder`, {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingCharges,
            totalAmount
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        dispatch({
            type: "createOrderSuccess",
        });

    } catch (error) {

        dispatch({
            type: "createOrderFail",
            payload: error.response.data.message
        });
    }
}


export const paymentVerification = (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOptions
) => async (dispatch) => {

    try {

        dispatch({
            type: "paymentVerificationRequest"
        });

        await axios.post(
            `${server}/paymentverification`,
            {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                orderOptions
            }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        dispatch({
            type: "paymentVerificationSuccess",
        });

    } catch (error) {

        dispatch({
            type: "paymentVerificationFail",
            payload: error.message
        });
    }
}


export const getMyOrders = () => async (dispatch) => {

    try {
        dispatch({
            type: "getMyOrdersRequest",
        });

        const { data } = await axios.get(`${server}/myorders`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "getMyOrdersSuccess",
            payload: data.orders
        });
    } catch (error) {

        dispatch({
            type: "getMyOrdersFail",
            payload: error.message
        });
    }
}


export const getMyOrderDetails = () => async (dispatch, id) => {

    try {
        dispatch({
            type: "getOrderDetailsRequest",
        });

        const { data } = await axios.get(`${server}/order/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "getOrderDetailsSuccess",
            payload: data.order
        });
    } catch (error) {

        dispatch({
            type: "getOrderDetailsFail",
            payload: error.message
        });
    }
}