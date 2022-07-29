const CartItem = (props) => {
    const {
        id,
        displayName,
        finalPrice,
        quantity,
        removeFromCart = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    return (
        <li className="collection-item">
            {displayName} <i
                className="material-icons cart__item-quantity"
                onClick={() => decQuantity(id)}
                onMouseDown={(evt) => evt.preventDefault()}
            >
                remove
            </i> x {quantity}
            <i
                className="material-icons cart__item-quantity"
                onClick={() => incQuantity(id)}
                onMouseDown={(evt) => evt.preventDefault()}
            >
                add
            </i> = {finalPrice * quantity} руб.
            <span
                className="secondary-content"
                onClick={() => removeFromCart(id)}
            >
                <i className="material-icons cart-delete">close</i>
            </span>
        </li>

    )
}
export { CartItem };
