import { GoodsItem } from "./GoodsItem";

const GoodsList = (props) => {
    const { goods = [], addToCart = Function.prototype } = props;

    if (!goods.length) {
        return <h3>Тут ничего нет</h3>
    }

    return (
        <div className="goods">
            {goods.map((good) => (
                <GoodsItem key={good.mainId} {...good} addToCart={addToCart} />
            ))}
        </div>
    )
}
export { GoodsList };
