import USPStyle from "./Style";

const USP = () => {
  return (
    <USPStyle>
      <section className="usp_row">
        <div className="usp_item">
          <span>
            <img src="/images/original.png" />
          </span>
          <span>
            <strong>100% ORIGINAL</strong> guarantee for all products
          </span>
        </div>
        <div className="usp_item">
          <span>
            <img src="/images/30days.png" />
          </span>
          <span>
            <strong>Return within 30days</strong> of receiving your order
          </span>
        </div>
        <div className="usp_item">
          <span>
            <img src="/images/truck.png" />
          </span>
          <span>
            <strong>Get free delivery</strong> for every order above Rs. 799
          </span>
        </div>
      </section>
    </USPStyle>
  );
};

export default USP;
