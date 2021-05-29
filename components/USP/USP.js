import classes from "./USP.module.css";

const USP = () => {
  return (
    <div className="container">
      <section className={classes.usp_row}>
        <div className={classes.usp_item}>
          <span>
            <strong>100% ORIGINAL</strong> guarantee for all products
          </span>
        </div>
        <div className={classes.usp_item}>
          <span>
            <strong>Return within 30days</strong> of receiving your order
          </span>
        </div>
        <div className={classes.usp_item}>
          <span>
            <strong>Get free delivery</strong> for every order above Rs. 799
          </span>
        </div>
      </section>
    </div>
  );
};

export default USP;
