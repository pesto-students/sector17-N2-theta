import Product from "../ProductCard";
import ProductsGridStyle from "./Style";

const ProductsGrid = () => {
  return (
    <ProductsGridStyle>
      <div className="product_grid">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </ProductsGridStyle>
  );
};

export default ProductsGrid;
