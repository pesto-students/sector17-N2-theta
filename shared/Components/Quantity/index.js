import QuantityStyle from "./Style";

const Quantity = ({ onQtyUpdate, quantity = 1, from, setQtyUpdate}) => {
  const minQty = 1;
  
  const onQtyDecreaseHandler = () => {
    if (quantity > minQty) {
      onQtyUpdate(quantity - 1);
      from == 'cart' && setQtyUpdate(true);
    }
  };

  const onQtyIncreaseHandler = () => {
    onQtyUpdate(quantity + 1);
    from == 'cart' && setQtyUpdate(true);
  };

  return (
    <QuantityStyle from={from}>
      <ul>
        <li>Quantity</li>
        <li>
          <div>
            <button
              onClick={
                onQtyDecreaseHandler
              }
              disabled={parseInt(quantity) == minQty}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={
                onQtyIncreaseHandler
              }
            >
              +
            </button>
          </div>
        </li>
      </ul>
    </QuantityStyle>
  )
}

export default Quantity;