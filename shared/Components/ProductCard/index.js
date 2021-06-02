import Link from "next/link";
import AddToCart from "shared/Utils/AddToCart";
import ProductCardStyle from "./Style";

const ProductCard = (props) => {
  const { image, title, price, sku } = props;

  return (
    <ProductCardStyle>
      <Link href="/categories/[category-slug]/" as="/categories/category-1/product-1">
        <a>
          <div className="product_item">
            <div className="image_wrapper">
              <img src={ image } />
            </div>
            <div className="product_caption">
              <span className="soldby">Sold by: Nike</span>
              <div className="product_title">{ title }</div>
              <div className="review">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <span className="count">149</span>
              </div>
              <div className="row_group">
                <div className="price">
                  <span className="main-price">Rs.{ price }</span>
                  <span className="stike-through">Rs.150</span>
                </div>
                <div className="add-to-cart-placeholder"></div>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <AddToCart productId={ sku } quantity={1}>
        <span className="text">Add to Cart</span>
        <span className="plus">+</span>
      </AddToCart>
    </ProductCardStyle>
  );
};
export default ProductCard;
