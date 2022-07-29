import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Cart } from "./Cart";
import { CartList } from "./CartList";
import { GoodsList } from "./GoodsList";
import { Preloader } from "./Preloader";

const Shop = () => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false);

    const getGoods = () => {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        })
            .then(response => response.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
            });
    };

    const addToCart = (item) => {
        const itemIndex = order.findIndex((el) => el.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((el, index) => {

                if (index === itemIndex) {
                    return {
                        ...el,
                        quantity: el.quantity + 1,
                    }
                } else {
                    return el;
                }
            })
            setOrder(newOrder);
        }
    };

    const removeFromCart = (id) => {
        const newOrder = order.filter((item) => item.id !== id);
        setOrder(newOrder);
    };

    const handleCartShow = () => {
        setCartShow(!isCartShow);
    };

    const incQuantity = (id) => {
        const newOrder = order.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity,
                }
            } else {
                return item;
            }
        });

        setOrder(newOrder);
    };
    const decQuantity = (id) => {
        const newOrder = order.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity - 1;

                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }

            } else {
                return item;
            }

        }).filter((item) => item.quantity !== 0);

        setOrder(newOrder);
    }

    useEffect(getGoods, []);


    return (
        <main className="container content">
            <Cart quantity={order.length} handleCartShow={handleCartShow} />
            {
                loading
                    ? <Preloader />
                    : <GoodsList goods={goods} addToCart={addToCart} />
            }
            {
                isCartShow && <CartList
                    order={order}
                    handleCartShow={handleCartShow}
                    removeFromCart={removeFromCart}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            }
        </main>
    )
};

export { Shop };
