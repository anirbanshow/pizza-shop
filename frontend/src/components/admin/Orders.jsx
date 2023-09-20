import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEye } from 'react-icons/ai';
import { GiArmoredBoomerang } from 'react-icons/gi';

import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrders } from "../../redux/actions/admin";
import axios from 'axios';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';

const Orders = () => {

    const dispatch = useDispatch();

    const {
        loading, orders, error
    } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAdminOrders());
    }, [dispatch]);

    const processOrderHandler = async (id) => {

        try {
            const { data } = await axios.get(`${server}/admin/order/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            dispatch(getAdminOrders());
            toast.success(data?.message);
        } catch (error) {
            toast.success("Something went wrong");
        }
    }

    return (
        <section className="tableClass">
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Status</th>
                            <th>Item Qty</th>
                            <th>Amount</th>
                            <th>User</th>
                            <th>Payment Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders && orders.map((i) => (
                                <tr key={i._id}>
                                    <td>#{i._id}</td>
                                    <td>{i.orderStatus}</td>
                                    <td>
                                        {
                                            i.orderItems.chessBurger.quantity +
                                            i.orderItems.vegChessBurger.quantity +
                                            i.orderItems.BurgerWithFries.quantity
                                        }
                                    </td>
                                    <td>${i.totalAmount}</td>
                                    <td>{i.user.name}</td>
                                    <td>{i.paymentMethod}</td>
                                    <td>
                                        <Link to={`/order/${i._id}`}>
                                            <AiOutlineEye />
                                        </Link>

                                        <button onClick={() => processOrderHandler(i._id)}>
                                            <GiArmoredBoomerang />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default Orders;