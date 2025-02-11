import { BasketItem } from "./BasketItem";

function BasketList(props) {
  const { order = [], handleBasketShow = Function.prototype } = props;

  const totalPrice = order.reduce((sum, item) => {
    return sum + item.priceForSale * item.quantity;
  }, 0);
  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Корзина</li>
      {order.length ? (
        order.map((item) => <BasketItem {...item} key={item.id} />)
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}
      <li className="collection-item active">Общая стоимость: {totalPrice} руб.</li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  );
}
export { BasketList };
