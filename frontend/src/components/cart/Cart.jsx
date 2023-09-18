import React from 'react';
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

    const {
        cartItems: {
            chessBurger: {
                quantity: chessBurger
            },
            vegChessBurger: {
                quantity: vegChessBurger
            },
            BurgerWithFries: {
                quantity: BurgerWithFries
            }
        },
        subTotal,
        tax,
        shippingCharges,
        totalAmount
    } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const increment = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "chessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                dispatch({ type: "vegChessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                dispatch({ type: "burgerWithFriesIncrement" });
                dispatch({ type: "calculatePrice" });
                break;

            default:
                dispatch({ type: "chessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    };

    const decrement = (item) => {
        switch (item) {
            case 1:
                if (chessBurger === 0) break;
                dispatch({ type: "chessBurgerDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 2:
                if (vegChessBurger === 0) break;
                dispatch({ type: "vegChessBurgerDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
            case 3:
                if (BurgerWithFries === 0) break;
                dispatch({ type: "burgerWithFriesDecrement" });
                dispatch({ type: "calculatePrice" });
                break;

            default:
                if (chessBurger === 0) break;
                dispatch({ type: "burgerWithFriesDecrement" });
                dispatch({ type: "calculatePrice" });
                break;
        }
    };

    return (
        <section className="cart">
            <main>
                <CartItem
                    title="Chess Burger"
                    img={burger1}
                    value={chessBurger}
                    increment={() => increment(1)}
                    decrement={() => decrement(1)}
                />

                <CartItem
                    title="Veg Chess Burger"
                    img={burger2}
                    value={vegChessBurger}
                    increment={() => increment(2)}
                    decrement={() => decrement(2)}
                />

                <CartItem
                    title="Chees Burger With Fries"
                    img={burger3}
                    value={BurgerWithFries}
                    increment={() => increment(3)}
                    decrement={() => decrement(3)}
                />

                <article>
                    <div>
                        <h4>Sub total</h4>
                        <p>${subTotal}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>${tax}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>${shippingCharges}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>${totalAmount}</p>
                    </div>
                    <Link to="/shipping">Checkout</Link>
                </article>

            </main>
        </section>
    )
}

const CartItem = ({ value, title, img, increment, decrement }) => {
    return (
        <div className="cartItem">
            <div>
                <h4>{title}</h4>
                <img src={img} alt="img" />
            </div>

            <div>
                <button onClick={decrement}>-</button>
                <input type="number" value={value} readOnly />
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

export default Cart