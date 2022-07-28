const CartItem = (props) => {
    const {
        id,
        displayName,
        finalPrice,
        quantity,
        removeFromCart = Function.prototype,
    } = props;
    console.log(finalPrice)
    return (
        <li className="collection-item">
            {displayName} x {quantity} = {finalPrice * quantity} руб.
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