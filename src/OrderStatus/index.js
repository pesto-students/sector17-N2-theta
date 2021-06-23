/* eslint-disable react/jsx-boolean-value */
import useOrderStatus from '@/data/hooks/use-orders';
import { useRouter } from 'next/router';
import OrderStatusStyle from './Style';
import Skeleton from 'react-loading-skeleton';
import { useContext, useEffect, useState } from 'react';
import Address from 'shared/Components/Address';
import Link from 'next/link';
import GlobalContext from '@/appContext';
import FailedStatus from './FailedStatus';

const OrderStatus = () => {
  const router = useRouter();
  const orderId = router.query['id'];
  const [order, setOrder] = useState({});
  const [subtotal, setSubtotal] = useState([]);
  const [discount, setDiscount] = useState();
  const [products, setProducts] = useState([]);

  const { data, isLoading, isError } = useOrderStatus(orderId);

  useEffect(() => {
    if (!isLoading) {
      setOrder({ ...data });
    }
  }, [data]);

  useEffect(() => {
    if (order) {
      const productArray = order.lineItems;
      const productArrayPro =
        productArray && productArray.map(element => element.id);
      setProducts([productArrayPro]);
      const subtotalArray =
        productArray && productArray.map(element => element.price);
      setSubtotal(
        subtotalArray && subtotalArray.reduce((acc, val) => acc + val, 0)
      );
    }
  }, [order]);

  if (router.query['status'] === 'failed') {
    return <FailedStatus />;
  }
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
  return (
    <OrderStatusStyle>
      {order ? (
        <div>
          <h1 className={router.query['status']}>
            Order Status: {router.query['status'] == 'success' && 'Success'}
          </h1>
          <h2 className="subtitle success">
            Your Order has been scucessfully placed!
          </h2>

          <div className="row_group">
            <h3>Your Order Id: #{router.query['id']}</h3>
            <h3>Estimated delivery time 4 to 5 Working Days</h3>
          </div>
          <div className="row_group orders-row">
            <div className="order">
              <div className="address">
                <Address disable={true} />
              </div>
              <div className="row_group final_message">
                <div className="message">Thank you for your order! </div>
                <div className="continue_shop">
                  <span>
                    <Link href="/">Continue Shopping</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="summry">
              <h2>Order Summery</h2>

              <p>
                <strong>Subtotal: </strong>
                <span>Rs. {subtotal}</span>
              </p>

              {order && order.couponDiscount && order.couponDiscount.coupon && (
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
