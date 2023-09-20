import axios from "axios";
import { server } from "../store";

export const getAdminStats = () => async (dispatch) => {

    try {
        dispatch({
            type: "getDashboardStatsRequest",
        });

        const { data } = await axios.get(`${server}/admin/stats`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "getDashboardStatsSuccess",
            payload: data
        });
    } catch (error) {

        dispatch({
            type: "getDashboardStatsFail",
            payload: error.message
        });
    }
}

export const getAdminUsers = () => async (dispatch) => {

    try {
        dispatch({
            type: "getAdminUsersRequest",
        });

        const { data } = await axios.get(`${server}/admin/users`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "getAdminUsersSuccess",
            payload: data.users
        });
    } catch (error) {

        dispatch({
            type: "getAdminUsersFail",
            payload: error.message
        });
    }
}

export const getAdminOrders = () => async (dispatch) => {

    try {
        dispatch({
            type: "getAdminOrdersRequest",
        });

        const { data } = await axios.get(`${server}/admin/order`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        })

        dispatch({
            type: "getAdminOrdersSuccess",
            payload: data.orders
        });
    } catch (error) {

        dispatch({
            type: "getAdminOrdersFail",
            payload: error.message
        });
    }
}