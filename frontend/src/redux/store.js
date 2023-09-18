import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer, ordersReducers } from "./reducers/orderReducer";

const store = configureStore({

    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        orders: ordersReducers
    }
});

export default store;

export const server = "http://localhost:4000/api/v1";