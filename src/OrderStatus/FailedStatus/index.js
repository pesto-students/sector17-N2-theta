import OrderStatusFaildStyle from './Style';
import Link from 'next/link';
const FailedStatus = () => {
  return (
    <OrderStatusFaildStyle>
      <div>
        <div className="row_group"></div>
        <div className="row_group orders-row">
          <div className="order">
            <div className="address">
              <h1 className="failed">Oh no, Your Payment failed</h1>
              <h3>There are something worng please try again...</h3>
            </div>
            <span className="button">
              <Link href="/checkout">Try Again</Link>
            </span>
          </div>
        </div>
      </div>
    </OrderStatusFaildStyle>
  );
};

export default FailedStatus;
