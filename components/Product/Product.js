import classes from "./Product.module.css";
const Product = (props) => {
  return (
    <div className={classes.product_item} key={props.id}>
      <img src={props.image} />
      <div className={classes.product_caption}>
        <div className={classes.product_title}>{props.title}</div>
        <div className={classes.product_price}>{props.price} <span>{props.price}</span></div>
      </div>
    </div>
  );
};
export default Product;
