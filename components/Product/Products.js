import classes from "./Product.module.css";
import Product from "./Product";

const Products = (props) => {
  return (
    <div className="container">
      <div className={classes.products_grid}>
        {props.products.map((product) => (
          <Product
          key={product.id}
          id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
