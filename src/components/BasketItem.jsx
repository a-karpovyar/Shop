function BasketItem(props) {
  const { id, name, priceForSale, quantity } = props;
  return (
    <li key={id} className="collection-item">
      {name} x{quantity} = {priceForSale}
      <span class="secondary-content">
        <i class="material-icons basket-delete">close</i>
      </span>
    </li>
  );
}
export { BasketItem };
