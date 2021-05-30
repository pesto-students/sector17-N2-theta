import Link from "next/link";
import ProductCardStyle from "./Style";

const ProductCard = (props) => {
  return (
    <ProductCardStyle>
      <Link href="/categories/[category-slug]/[product-slug]" as="/categories/category-1/product-1">
        <a>
          <div className="product_item">
            <div className="image_wrapper">
              <img src="/images/product-img.png" />
            </div>
            <div className="product_caption">
              <span className="soldby">Sold by: Nike</span>
              <div className="product_title">Product 1</div>
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
                  <span className="main-price">Rs.100</span>
                  <span className="stike-through">Rs.150</span>
                </div>
                <div className="add-to-cart-placeholder"></div>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <button className="add-to-cart">
        <span className="text">Add to Cart</span>
        <span className="plus">+</span>
      </button>
    </ProductCardStyle>
  );
};
export default ProductCard;
