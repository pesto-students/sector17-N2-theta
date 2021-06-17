import { useEffect, useState } from "react";
import ShippingMethodsStyle from "./Style";

const ShippingMethods = (props) => {
  const {
    enabled,
    pincode: customerPincode,
    cartItemSellers,
    cartProducts,
    setSummaryEnabled
  } = props;
  const [itemsForStanderdShipping, setItemsForStanderdShipping] = useState();
  const [itemsForExpressShipping, setItemsForExpressShipping] = useState();

  useEffect(() => {
    if(cartProducts && cartItemSellers && customerPincode){
      let standardShip = {};
      let expressShip = {};
  
      Object.keys(cartProducts).map((product) => {
        const { seller } = cartProducts[product];
        if(cartItemSellers[seller]){
          const { pincode: sellerPincode } = cartItemSellers[seller];
          if (sellerPincode === customerPincode) {
            expressShip = {
              ...expressShip,
              [product]: cartProducts[product],
            };
          } else {
            standardShip = {
              ...standardShip,
              [product]: cartProducts[product],
            };
          }
        }
      });
  
      setItemsForStanderdShipping(standardShip);
      setItemsForExpressShipping(expressShip);
    }
  }, [cartProducts, cartItemSellers, customerPincode]);

  return enabled ? (
    <ShippingMethodsStyle enabled={enabled}>
      <div className='heading'>Shipping Methods</div>
      <div className="shipping-inner">
        <div>
          {itemsForStanderdShipping && Object.keys(itemsForStanderdShipping).length > 0 && (
            <>
              <div className="shipping-type">Standard Shipping</div>
              <div className='products'>
                {Object.keys(itemsForStanderdShipping).map((product) => {
                  const { id, image, name, price } = itemsForStanderdShipping[product];
                  return (
                    <div key={id} className='product'>
                      <img src={image} alt={name} />
                      <div className="detail">
                        <div className='name'>{name}</div>
                        <div className='price'>Rs. {price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div>
          {itemsForExpressShipping && Object.keys(itemsForExpressShipping).length > 0 && (
            <>
              <div className="shipping-type">Express Shipping</div>
              <div className='products'>
                {Object.keys(itemsForExpressShipping).map((product) => {
                  const { id, image, name, price } = itemsForExpressShipping[product];
                  return (
                    <div key={id} className='product'>
                      <img src={image} alt={name} />
                      <div className="detail">
                        <div className='name'>{name}</div>
                        <div className='price'>Rs.{price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div>
          <button type="button" onClick={() => setSummaryEnabled(true)}>Continue</button>
        </div>
      </div>
    </ShippingMethodsStyle>
  ) : null;
};

export default ShippingMethods;
