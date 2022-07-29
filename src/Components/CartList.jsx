import { CartItem } from "./CartItem";

const CartList = (props) => {
    const {
        order = [],
        handleCartShow = Function.prototype,
        removeFromCart = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    const totalPrice = order.reduce((acc, el) => {
        return acc + el.finalPrice * el.quantity;
    }, 0);

    return (
        <ul className="collection cart-list purple accent-1">
            <li className="collection-item pink accent-2">Корзина</li>
            {
                order.length
                    ? order.map((item) => (
                        <CartItem
                            key={item.id}
                            {...item}
                            removeFromCart={removeFromCart}
                            incQuantity={incQuantity}
                            decQuantity={decQuantity}
                        />))
                    : <li className="collection-item">Корзина пуста</li>
            }
            <li className="collection-item pink accent-2">Общая стоимость: {totalPrice} руб.</li>
            <li className="collection-item purple lighten-5"><button className="btn-small pink accent-3">Оформить заказ</button></li>

            <i className="material-icons cart-close" onClick={handleCartShow}>close</i>
        </ul >
    );
};

export { CartList };
