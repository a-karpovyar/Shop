function GoodsItem(props) {
  const {
    mainId: id,
    displayName: name,
    displayType: description,
    price: { regularPrice: priceForSale },
    displayAssets: [{ full_background }],
    addToBasket = Function.prototype
  } = props;

  return (
    <div className="card">
      <div className="card-image">
        <img src={full_background} alt={name} />
      </div>
      <div className="card-content">
        <span className="card-title">{name}</span>
        <p>{description}</p>
      </div>
      <div className="card-action">
        <button className="btn" onClick={()=> addToBasket({id,name,priceForSale})}>Купить</button>
        <span className="right" style={{fontSize:'1.8rem'}}>{priceForSale} руб.</span>
      </div>
    </div>
  );
}

export { GoodsItem };
