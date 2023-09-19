import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { server } from '../../redux/store';
import axios from 'axios';

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    async function fetchOrderDetail() {

        setLoading(true)

        const { data } = await axios.get(`${server}/order/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })
        console.log(data);
        setOrder(data.document);
        setLoading(false);
    }

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    return (
        <section className="OrderDetails">
            {
                loading
                    ? "Loading ..."
                    : <main>
                        <h1>Order Details</h1>

                        <div>
                            <h2>Shipping</h2>
                            <p>
                                <b>Address</b>
                                {`${order?.shippingInfo?.hNo}`}, {`${order?.shippingInfo?.city}`}, {`${order?.shippingInfo?.state}`},
                                {`${order?.shippingInfo?.country}`}, {`${order?.shippingInfo?.pinCode}`}
                            </p>
                        </div>

                        <div>
                            <h2>Contact</h2>
                            <p>
                                <b>Name</b>
                                {`${order?.user.name}`}
                            </p>
                            <p>
                                <b>Phone Number</b>
                                {`${order?.shippingInfo?.phoneNo}`}
                            </p>
                        </div>

                        <div>
                            <h2>Status</h2>
                            <p>
                                <b>Order Status</b>
                                {`${order?.orderStatus}`}
                            </p>
                            <p>
                                <b>Placed At</b>
                                {`${order?.createdAt.split("T")[0]}`}
                            </p>
                            <p>
                                <b>Delivered At</b>
                                {`${order?.deliveredAt ? order?.deliveredAt.split("T")[0] : "NA"}`}
                            </p>
                        </div>

                        <div>
                            <h2>Payment</h2>
                            <p>
                                <b>Payment Method</b>
                                {`${order?.paymentMethod}`}
                            </p>
                            <p>
                                <b>Payment Reference</b>
                                {order?.paymentMethod === "Online" ? `#${order?.paymentInfo}` : "NA"}
                            </p>
                            <p>
                                <b>Paid At</b>
                                {
                                    order?.paymentMethod === "Online"
                                        ? `#${order?.paidAt.split("T")[0]}`
                                        : "NA"
                                }
                            </p>
                        </div>

                        <div>
                            <h2>Amount</h2>
                            <p>
                                <b>Items Total</b>{order?.itemsPrice}
                            </p>
                            <p>
                                <b>Shopping Total</b>{order?.shippingCharges}
                            </p>
                            <p>
                                <b>Tax</b>{order?.taxPrice}
                            </p>
                            <p>
                                <b>Total Amount</b>{order?.totalAmount}
                            </p>
                        </div>

                        <article>
                            <h2>Orderrd Items</h2>

                            <div>
                                <h4>Chess Burger</h4>
                                <div>
                                    <span>
                                        {order?.orderItems?.chessBurger.quantity}
                                    </span>X
                                    <span>
                                        {order?.orderItems?.chessBurger.price}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4>Veg Chess Burger</h4>
                                <div>
                                    <span>
                                        {order?.orderItems?.vegChessBurger.quantity}
                                    </span>X
                                    <span>
                                        {order?.orderItems?.vegChessBurger.price}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4>Burger With Fries</h4>
                                <div>
                                    <span>
                                        {order?.orderItems?.BurgerWithFries.quantity}
                                    </span>X
                                    <span>
                                        {order?.orderItems?.BurgerWithFries.price}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ fontWeight: 800 }}>Sub Total</h4>
                                <p style={{ fontWeight: 800 }}>
                                    ${
                                        order?.orderItems?.BurgerWithFries.quantity * order?.orderItems?.BurgerWithFries.price +
                                        order?.orderItems?.chessBurger.quantity * order?.orderItems?.chessBurger.price +
                                        order?.orderItems?.vegChessBurger.quantity * order?.orderItems?.vegChessBurger.price
                                    }
                                </p>
                            </div>

                        </article>

                    </main>
            }

        </section>
    )
}

export default OrderDetails;