import React from 'react';
import MenuCard from './MenuCard';
import burger1 from "../../assets/burger1.png";
import burger2 from "../../assets/burger2.png";
import burger3 from "../../assets/burger3.png";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Menu = () => {

    const dispatch = useDispatch();

    const addToCartHandler = (item) => {
        switch (item) {
            case 1:
                dispatch({ type: "chessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to cart");
                break;
            case 2:
                dispatch({ type: "vegChessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to cart");
                break;
            case 3:
                dispatch({ type: "burgerWithFriesIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to cart");
                break;
            default:
                dispatch({ type: "chessBurgerIncrement" });
                dispatch({ type: "calculatePrice" });
                toast.success("Added to cart");
                break;
        }
    }

    return (
        <section id="menu">

            <h1>Menu</h1>

            <div>
                <MenuCard
                    itemNum={1}
                    burgerSrc={burger1}
                    price={200}
                    title="Chess Burger"
                    handler={addToCartHandler}
                    delay={0.1}
                />
                <MenuCard
                    itemNum={2}
                    burgerSrc={burger2}
                    price={500}
                    title="Veg Chess Burger"
                    handler={addToCartHandler}
                    delay={0.5}
                />
                <MenuCard
                    itemNum={3}
                    burgerSrc={burger3}
                    price={1800}
                    title="Burger With Fries"
                    handler={addToCartHandler}
                    delay={0.8}
                />
            </div>

        </section>
    )
}

export default Menu;