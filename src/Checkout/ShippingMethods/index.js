import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import ShippingMethodsStyle from './Style';

const ShippingMethods = props => {
  const { cartPriceDetails, setFinalPriceToPay } = useContext(GlobalContext);
  const {
    enabled,
    pincode: customerPincode,
    cartItemSellers,
    cartProducts,
    summaryEnabled,
    setSummaryEnabled
  } = props;
  const [itemsForStanderdShipping, setItemsForStanderdShipping] = useState();
  const [itemsForExpressShipping, setItemsForExpressShipping] = useState();

  useEffect(() => {
    if (cartProducts && cartItemSellers && customerPincode) {
      let standardShip = {};
      let expressShip = {};

      Object.keys(cartProducts).map(product => {
        const { seller } = cartProducts[product];
        if (cartItemSellers[seller]) {
          const { pincode: sellerPincode } = cartItemSellers[seller];
          if (sellerPincode === customerPincode) {
            expressShip = {
              ...expressShip,
              [product]: cartProducts[product]
            };
          } else {
            standardShip = {
              ...standardShip,
              [product]: cartProducts[product]
            };
          }
        }
      });

      setItemsForStanderdShipping(standardShip);
      setItemsForExpressShipping(expressShip);
    }
  }, [cartProducts, cartItemSellers, customerPincode]);

  useEffect(() => {
    if (
      itemsForStanderdShipping &&
      itemsForExpressShipping &&
      Object.keys(itemsForExpressShipping).length > 0 &&
      cartPriceDetails.total > 500
    ) {
      setFinalPriceToPay(cartPriceDetails.total - 100);
    } else {
      setFinalPriceToPay(cartPriceDetails.total);
    }
  }, [itemsForStanderdShipping, itemsForExpressShipping]);

  return enabled ? (
    <ShippingMethodsStyle enabled={enabled}>
      <div className="heading">Shipping Methods</div>
      <div className="shipping-inner">
        <div>
          {itemsForStanderdShipping &&
            Object.keys(itemsForStanderdShipping).length > 0 && (
              <>
                <div className="shipping-type">Standard Shipping</div>
                <div className="products while-checkout">
                  {Object.keys(itemsForStanderdShipping).map(product => {
                    const { id, image, name, price } =
                      itemsForStanderdShipping[product];
                    return (
                      <div key={id} className="product">
                        <img src={image} alt={name} />
                        <div className="detail">
                          <div className="name">{name}</div>
                          <div className="price">Rs. {price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
        </div>
        <div>
          {itemsForExpressShipping &&
            Object.keys(itemsForExpressShipping).length > 0 && (
              <>
                <div className="shipping-type">Express Shipping</div>
                <div className="products">
                  {Object.keys(itemsForExpressShipping).map(product => {
                    const { id, image, name, price } =
                      itemsForExpressShipping[product];
                    return (
                      <div key={id} className="product">
                        <img src={image} alt={name} />
                        <div className="detail">
                          <div className="name">{name}</div>
                          <div className="price">Rs.{price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {cartPriceDetails && cartPriceDetails.total > 500 && (
                  <div className="s-discount">
                    <div className="green">
                      Neibourhood Discount of Rs. 100 is applied.
                    </div>
                    <div className="price">
                      Final Price{' '}
                      <span className="strike">
                        Rs. {cartPriceDetails.total.toFixed(2)}
                      </span>{' '}
                      <span className="strik">
                        Rs. {(cartPriceDetails.total - 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
        </div>
        {!summaryEnabled && (
          <div className="button-wrapper">
            <button type="button" onClick={() => setSummaryEnabled(true)}>
              Continue
            </button>
          </div>
        )}
      </div>
    </ShippingMethodsStyle>
  ) : null;
};

export default ShippingMethods;
