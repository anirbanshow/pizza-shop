import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { server } from '../../redux/store';
import axios from 'axios';

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState({});

    async function fetchOrderDetail() {

        const { data } = await axios.get(`${server}/order/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        setOrder(data.document);
    }

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    return (
        <section className="OrderDetails">
            <main>
                <h1>Order Details</h1>

                <div>
                    <h2>Shipping</h2>
                    <p>
                        <b>Address</b>
                        {"Kolkata 700027"}
                    </p>
                </div>

                <div>
                    <h2>Contact</h2>
                    <p>
                        <b>Name</b>
                        {"Dev 1"}
                    </p>
                    <p>
                        <b>Phone Number</b>
                        {"9804806599"}
                    </p>
                </div>

                <div>
                    <h2>Status</h2>
                    <p>
                        <b>Order Status</b>
                        {"Processing"}
                    </p>
                    <p>
                        <b>Placed At</b>
                        {"45mins ago"}
                    </p>
                    <p>
                        <b>Delivered At</b>
                        {"45mins ago"}
                    </p>
                </div>

                <div>
                    <h2>Payment</h2>
                    <p>
                        <b>Payment Method</b>
                        {"Online"}
                    </p>
                    <p>
                        <b>Payment Reference</b>
                        {"asfasfafasfafasf"}
                    </p>
                    <p>
                        <b>Paid At</b>
                        {"45mins ago"}
                    </p>
                </div>

                <div>
                    <h2>Amount</h2>
                    <p>
                        <b>Items Total</b>{2000}
                    </p>
                    <p>
                        <b>Shopping Total</b>{200}
                    </p>
                    <p>
                        <b>Tax</b>{100}
                    </p>
                    <p>
                        <b>Total Amount</b>{2000 + 200 + 100}
                    </p>
                </div>

                <article>
                    <h2>Orderrd Items</h2>

                    <div>
                        <h4>Pizza Large</h4>
                        <div>
                            <span>{12}</span>X <span>{232}</span>
                        </div>
                    </div>

                    <div>
                        <h4>Pizza Large</h4>
                        <div>
                            <span>{12}</span>X <span>{232}</span>
                        </div>
                    </div>

                    <div>
                        <h4>Pizza Large</h4>
                        <div>
                            <span>{12}</span>X <span>{232}</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontWeight: 800 }}>Sub Total</h4>
                        <p style={{ fontWeight: 800 }}>{213}</p>
                    </div>

                </article>

            </main>
        </section>
    )
}

export default OrderDetails;