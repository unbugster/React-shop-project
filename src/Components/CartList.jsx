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
    }, 0)

    return (
        <ul className="collection cart-list">
            <li className="collection-item active">Корзина</li>
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
            <li className="collection-item active">Общая стоимость: {totalPrice} руб.</li>
            <li className="collection-item"><button className="btn-small">Оформить заказ</button></li>

            <i className="material-icons cart-close" onClick={handleCartShow}>close</i>
        </ul >
    )
}
export { CartList };