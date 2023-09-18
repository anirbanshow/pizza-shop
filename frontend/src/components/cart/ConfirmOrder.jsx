import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, paymentVerification } from '../../redux/actions/order';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../redux/store';

const ConfirmOrder = () => {

    const [paymentMethod, setpaymentMethod] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, subTotal, tax, shippingCharges, totalAmount, shippingInfo } =
        useSelector(state => state.cart);

    const { message, error } = useSelector(state => state.order);

    const submitHandler = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (paymentMethod === "COD") {
            dispatch(
                createOrder(
                    shippingInfo,
                    cartItems,
                    paymentMethod,
                    subTotal,
                    tax,
                    shippingCharges,
                    totalAmount
                )
            );
        } else {

            const { data: {
                order,
                orderOptions
            } } = await axios.post(`${server}/createOrderOnline`, {
                shippingInfo,
                orderItems: cartItems,
                paymentMethod,
                itemsPrice: subTotal,
                taxPrice: tax,
                shippingCharges,
                totalAmount
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            const options = {
                key: "rzp_test_5g4WpDRBhvTGxU",
                amount: order.amount,
                currency: "INR",
                name: "Anirban Dev",
                description: "This is test mode",
                order_id: order.id,
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    const { data } = await axios.post(`${server}/paymentverification`,
                        { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions },
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true
                        }
                    );
                    console.log(data);
                    toast.success(message);
                    dispatch({ type: "clearMessage" });
                    dispatch({ type: "emptyState" });
                },
                theme: {
                    "color": "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
    }

    useEffect(() => {

        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
            dispatch({ type: "emptyState" });
            navigate("/paymentsuccess")
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
            setDisableBtn(false);
        }

    }, [dispatch, message, error, navigate]);

    return (
        <section className="confirmOrder">
            <main>
                <h1>Confirm Order</h1>

                <form
                    onSubmit={submitHandler}
                >
                    <div>
                        <label>Cash On Delivery</label>
                        <input
                            type='radio'
                            name='payment'
                            required
                            onChange={() => setpaymentMethod("COD")}
                        />
                    </div>
                    <div>
                        <label>Online</label>
                        <input
                            type='radio'
                            name='payment'
                            onChange={() => setpaymentMethod("Online")}
                        />
                    </div>

                    <button disabled={disableBtn} type="submit">Place Order</button>
                </form>

            </main>
        </section>
    )
}

export default ConfirmOrder;