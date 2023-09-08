import React from 'react';
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";
import { Link } from "react-router-dom";

const Cart = () => {

    const increment = (item) => { }
    const decrement = (item) => { }

    return (
        <section className="cart">
            <main>
                <CartItem
                    title="PIZZA Large"
                    img={burger1}
                    value={0}
                    increment={() => increment(1)}
                    decrement={() => decrement(1)}
                />

                <CartItem
                    title="PIZZA Medium"
                    img={burger2}
                    value={0}
                    increment={() => increment(2)}
                    decrement={() => decrement(2)}
                />

                <CartItem
                    title="PIZZA Small"
                    img={burger3}
                    value={0}
                    increment={() => increment(3)}
                    decrement={() => decrement(3)}
                />

                <article>
                    <div>
                        <h4>Sub total</h4>
                        <p>${2000}</p>
                    </div>
                    <div>
                        <h4>Tax</h4>
                        <p>${2000 * 1.8}</p>
                    </div>
                    <div>
                        <h4>Shipping Charges</h4>
                        <p>${200}</p>
                    </div>
                    <div>
                        <h4>Total</h4>
                        <p>${2000 + 2000 * 1.8 + 200}</p>
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