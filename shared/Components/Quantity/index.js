import QuantityStyle from "./Style";

const Quantity = ({ onQtyUpdate, quantity = 1, from, sku}) => {

  const onQtyDecreaseHandler = () => {
    if (quantity > 0) {
      onQtyUpdate(quantity - 1);
    }
  };

  const onQtyIncreaseHandler = () => {
    onQtyUpdate(quantity + 1);
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