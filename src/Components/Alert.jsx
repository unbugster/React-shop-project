import { useEffect } from "react";

const Alert = (props) => {
    console.log('===alert!')
    const {
        name = '',
        closeAlert = Function.prototype
    } = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId)
        }
        // eslint-disable-next-line
    }, [name])

    return (
        <div id="toast-container">
            <div className="toast">{name} добавлен в корзину</div>
        </div>
    );
}
export { Alert };