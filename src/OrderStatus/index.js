import OrderStatusStyle from './Style';
const OrderStatus = () => {
  return (
    <OrderStatusStyle>
      <h1>Detail of Order: #1234</h1>
      <div classNameName="row_group">
        <div classNameName="address">
          <strong>First Last Name</strong>
          <p>
            Street Appartment,
            <br />
            City, State, Pincode <br />
            Phone Number <a href="">1234567890</a> <br />
            Country
          </p>
        </div>
      </div>
      <div className="row_group">
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
        </div>
        <div className="summry">
          <h2>Order Summery</h2>

          <p>
            <strong>Subtotal: </strong> Rs. 500
          </p>
          <p>
            <strong>Discount: </strong> Rs. 100
          </p>
          <p>
            <strong>Total: </strong> Rs. 400
          </p>
        </div>
      </div>
    </OrderStatusStyle>
  );
};
export default OrderStatus;
