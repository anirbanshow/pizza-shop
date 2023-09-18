import { createReducer } from "@reduxjs/toolkit";

const initailState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : {
            chessBurger: {
                quantity: 0,
                price: 200
            },
            vegChessBurger: {
                quantity: 0,
                price: 500
            },
            BurgerWithFries: {
                quantity: 0,
                price: 1800
            }
        },
    subTotal: localStorage.getItem("cartPrices")
        ? JSON.parse(localStorage.getItem("cartPrices")).subTotal
        : 0,
    tax: localStorage.getItem("cartPrices")
        ? JSON.parse(localStorage.getItem("cartPrices")).tax
        : 0,
    shippingCharges: localStorage.getItem("cartPrices")
        ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges
        : 0,
    totalAmount: localStorage.getItem("cartPrices")
        ? JSON.parse(localStorage.getItem("cartPrices")).totalAmount
        : 0,
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {}
};

export const cartReducer = createReducer(
    initailState,
    {
        chessBurgerIncrement: (state) => {
            state.cartItems.chessBurger.quantity += 1;
        },
        vegChessBurgerIncrement: (state) => {
            state.cartItems.vegChessBurger.quantity += 1;
        },
        burgerWithFriesIncrement: (state) => {
            state.cartItems.BurgerWithFries.quantity += 1;
        },

        chessBurgerDecrement: (state) => {
            state.cartItems.chessBurger.quantity -= 1;
        },
        vegChessBurgerDecrement: (state) => {
            state.cartItems.vegChessBurger.quantity -= 1;
        },
        burgerWithFriesDecrement: (state) => {
            state.cartItems.BurgerWithFries.quantity -= 1;
        },

        calculatePrice: (state) => {

            state.subTotal =
                state.cartItems.chessBurger.price * state.cartItems.chessBurger.quantity +
                state.cartItems.vegChessBurger.price * state.cartItems.vegChessBurger.quantity +
                state.cartItems.BurgerWithFries.price * state.cartItems.BurgerWithFries.quantity

            state.tax = state.subTotal * 18 / 100;
            state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
            state.totalAmount = state.subTotal + state.tax + state.shippingCharges;
        },

        emptyState: (state) => {
            state.cartItems = {
                chessBurger: {
                    quantity: 0,
                    price: 200
                },
                vegChessBurger: {
                    quantity: 0,
                    price: 500
                },
                BurgerWithFries: {
                    quantity: 0,
                    price: 1800
                }
            }
            state.subTotal = 0;
            state.tax = 0;
            state.shippingCharges = 0;
            state.totalAmount = 0;
        },

        addShippingInfo: (state, action) => {
            state.shippingInfo = {
                hNo: action.payload.hNo,
                city: action.payload.city,
                country: action.payload.country,
                state: action.payload.state,
                pinCode: action.payload.pinCode,
                phoneNo: action.payload.phoneNo
            }
        }
    }
);