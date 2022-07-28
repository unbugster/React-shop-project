const
    GoodsItem = (props) => {
        const {
            mainId,
            displayName,
            displayDescription,
            displayAssets,
            price,
            addToCart = Function.prototype,
        } = props;

        const { full_background } = displayAssets[0];
        const { finalPrice } = price;
        const id = mainId;
        return (
            <div className="card">
                <div className="card-image">
                    <img src={full_background} alt={displayName} />

                </div>
                <div className="card-content">
                    <span className="card-title">{displayName}</span>
                    <p>
                        {displayDescription}
                    </p>
                </div>
                <div className="card-action">
                    <button className="btn" onClick={() => addToCart({ id, displayName, finalPrice })}>Купить</button>
                    <span className="right" style={{ fontSize: '1.8rem' }}>{finalPrice} руб.</span>
                </div>
            </div>
        )
    }
export { GoodsItem };
