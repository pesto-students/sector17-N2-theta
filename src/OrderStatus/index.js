import useOrderStatus from '@/data/hooks/use-orders';
import { useRouter } from 'next/router';
import OrderStatusStyle from './Style';
import Skeleton from 'react-loading-skeleton';
import GlobalContext from '@/appContext';
import { useContext, useEffect, useState } from 'react';
import Address from 'shared/Components/Address';
import { useProductsForOrder } from '@/data/hooks/use-products';
import  useProductsBySKU  from '@/data/hooks/use-products-by-sku';

const OrderStatus = () => {
  const router = useRouter();
  const orderId = router.query['id'];
  const [order, setOrder] = useState({});
  const [subtotal, setSubtotal] = useState([]);
  const [discount, setDiscount] = useState();
  const [products, setProducts] = useState([]);

  const { data, isLoading, isError } = useOrderStatus(orderId);
  const { data: productsList, isLoading: isProductLoading } = useProductsBySKU(0,20,products);

  useEffect(() => {
    if (!isLoading) {
      setOrder({ ...data });
    }
    if(!isProductLoading){
      console.log(products, " Product id");
    }
  }, [data]);

  useEffect(() => {
    if (order) {
      const productArray = order.lineItems;
      const productArrayPro = productArray && productArray.map(element => element.id); 
      setProducts([productArrayPro]);
      const subtotalArray = productArray && productArray.map(element => element.price); 
      setSubtotal(subtotalArray && subtotalArray.reduce((acc,val)=> acc+val,0));
    }
  }, [order,productsList]);

  if (isLoading) {
    return (
      <OrderStatusStyle>
        <h1>
          <Skeleton />
        </h1>
        <div className="row_group">
          <div className="address">
            <strong>
              <Skeleton />
            </strong>
            <p className="" style={{ margin: 0 }}>
              <Skeleton count={4} />
            </p>
          </div>
        </div>
        <div className="row_group orders-row">
          <div className="order">
            <div className="row_group item">
              <div className="product_img">
                <Skeleton height={150} />
              </div>
              <div className="product_info">
                <div className="name">
                  <Skeleton count={2} />
                </div>
                <div className="details">
                  <Skeleton count={4} />
                </div>
              </div>
            </div>
          </div>
          <div className="summry">
            <h2>Order Summery</h2>

            <p>
              <strong>Subtotal: </strong>
              <span>
                <Skeleton />
              </span>
            </p>
            <p>
              <strong>Discount: </strong>
              <span>
                <Skeleton />
              </span>
            </p>
            <p>
              <strong>Total: </strong>
              <span>
                <Skeleton />
              </span>
            </p>
          </div>
        </div>
      </OrderStatusStyle>
    );
  }
  if (isError) {
    return <h1>not Good</h1>;
  }
  return (
    <OrderStatusStyle>
      {order ? (
        <div>
          <h1>Order: #{router.query['id']}</h1>
          <div className="row_group">
            <div className="address">
              <Address />
            </div>
          </div>
          <div className="row_group orders-row">
            <div className="order">
              <div>
                {order.lineItems &&
                  Object.keys(order.lineItems).length > 0 &&
                  Object.keys(order.lineItems).map((item, index) => (
                    <div key={index}>
                      <div className="row_group item">
                        <div className="product_img">
                          <img src="https://storage.googleapis.com/sector17-chandigarh.appspot.com/1032001_sa.jpg" />
                        </div>
                        <div className="product_info">
                          <div className="name">Product</div>
                          <div className="details">
                            <div>
                              <span className="label">Sku:</span>
                              <span className="value">1003531</span>
                            </div>
                            <div>
                              <span className="label">Manufacturer:</span>
                              <span className="value">Aquarius</span>
                            </div>
                            <div>
                              <span className="label">Model:</span>
                              <span className="value">52290</span>
                            </div>
                          </div>
                        </div>
                        <div className="product_qty">
                          Qty: {order.lineItems[item].qty}
                        </div>
                        <div className="product_price">
                          Rs. {order.lineItems[item].price}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="summry">
              <h2>Order Summery</h2>

              <p>
                <strong>Subtotal: </strong>
                <span>Rs. {subtotal}</span>
              </p>

              {(order && order.couponDiscount) && order.couponDiscount.coupon && (
                <p>
                  <strong>Discount: </strong>
                  <span>Rs. {order.couponDiscount.discount}</span>
                </p>
              )}
              {order.total != '' && (
                <p>
                  <strong>Total: </strong>
                  <span>Rs. {order.total}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>There are something wrong nothing found by given Order #ID</div>
      )}
    </OrderStatusStyle>
  );
};
export default OrderStatus;
