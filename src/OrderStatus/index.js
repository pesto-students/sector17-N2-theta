import OrderStatusStyle from './Style';
import Skeleton from 'react-loading-skeleton';
import GlobalContext from '@/appContext';
import { useContext, useEffect, useState } from 'react';
import Address from 'shared/Components/Address';
import Link from "next/link";
import saveCartItems from 'shared/Utils/saveCartItems';
import { useRouter } from 'next/router';

const OrderStatus = () => {
  const router = useRouter();
  const { currentUser } = useContext(GlobalContext);
  const orderId = router.query['id'];
  const [order, setOrder] = useState({});
  const [subtotal, setSubtotal] = useState([]);
  const [discount, setDiscount] = useState();
  const [products, setProducts] = useState([]);

  const { data, isLoading, isError } = useOrderStatus(orderId);
  // const { data: productsList, isLoading: isProductLoading } = useProductsBySKU(0,20,products);

  useEffect(() => {
    if (!isLoading) {
      setOrder({ ...data });
    }
    // if(!isProductLoading){
    //   console.log(products, " Product id");
    // }
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

      if(currentUser) {
        saveCartItems({}, currentUser.uid);
      }
    }
  }, [order]);

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
        </div>
      </OrderStatusStyle>
    );
  }
  
  if (isError) {
    return <h1>not Good</h1>;
  }

  return (
    order ? (
      <OrderStatusStyle>
          <div>
            <h1>Order: #{router.query['id']}</h1>
            <div className="row_group"></div>
            <div className="row_group orders-row">
              <div className="order">
                <div className="address">
                  {
                    // eslint-disable-next-line react/jsx-boolean-value
                    <Address disable={true} />
                  }
                </div>
                <h1>Thank you for your order! <Link href="/">Continue Shopping</Link></h1>
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
      </OrderStatusStyle>
    ) : null
  )
};
export default OrderStatus;
