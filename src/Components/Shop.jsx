import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Alert } from "./Alert";
import { Cart } from "./Cart";
import { CartList } from "./CartList";
import { GoodsList } from "./GoodsList";
import { Preloader } from "./Preloader";

const Shop = () => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false);
    const [alertName, setAlertName] = useState('');

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
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {

                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem;
                }
            })
            setOrder(newOrder);
        }
        setAlertName(item.displayName);
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

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(getGoods, []);


    return (
        <main className="container content">
            <Cart quantity={order.length} handleCartShow={handleCartShow} />
            {
                loading
                    ? (<Preloader />)
                    : (<GoodsList goods={goods} addToCart={addToCart} />)
            }
            {
                isCartShow && (
                    < CartList
                        order={order}
                        handleCartShow={handleCartShow}
                        removeFromCart={removeFromCart}
                        incQuantity={incQuantity}
                        decQuantity={decQuantity}
                    />
                )}
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert} />
            }
        </main>
    );
};

export { Shop };
