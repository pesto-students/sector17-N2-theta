import useOrderStatus from '@/data/hooks/use-orders';
import { useRouter } from 'next/router';
import OrderStatusStyle from './Style';
import Skeleton from 'react-loading-skeleton';
import GlobalContext from "@/appContext";
import { useContext, useEffect, useState } from 'react';
import Address from 'shared/Components/Address';

const OrderStatus = () => {
  const router = useRouter();
  const [orderedEmail, setOrderedEmail] =useState("");

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    appartment: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    email: '',
    phone: '',
  });
  
  const { data, isLoading, isError } = useOrderStatus(router.query['id']);  
  // const { data: shippingAddress, isLoading: addresLoading } = useOrderStatus(orderedEmail);  

  useEffect(() => {
    if(!isLoading){
      setOrderedEmail(data.email);
    }
  }, [data]);

  if (!isLoading) {
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
      <h1>Order: #{router.query['id']}</h1>
      <div className="row_group">
        <div className="address">

        </div>
      </div>
      <div className="row_group orders-row">
        <div className="order">
          {data && Object.keys(data).length > 0 && (
            <div className="row_group item">
              <div className="product_img">
                <img src="https://storage.googleapis.com/sector17-chandigarh.appspot.com/1032001_sa.jpg" />
              </div>
              <div className="product_info">
                <div className="name">
                  Aquarius - Rush Playing Cards - Red/Black/White
                </div>
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
              <div className="product_qty">Qty: 5</div>
              <div className="product_price">Rs. 100</div>
            </div>
          )}
        </div>
        <div className="summry">
          <h2>Order Summery</h2>

          <p>
            <strong>Subtotal: </strong>
            <span>Rs. 500</span>
          </p>
          <p>
            <strong>Discount: </strong>
            <span>Rs. 100</span>
          </p>
          <p>
            <strong>Total: </strong>
            <span>Rs. 400</span>
          </p>
        </div>
      </div>
    </OrderStatusStyle>
  );
};
export default OrderStatus;
