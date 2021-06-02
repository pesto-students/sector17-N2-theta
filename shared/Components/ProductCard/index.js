import Link from "next/link";
import ProductCardStyle from "./Style";

const ProductCard = (props) => {
  return (
    <ProductCardStyle>
      <Link href={`/categories/${props.category}/${props.id}`} as={`/categories/${props.category}/${props.id}`}>
        <a>
          <div className="product_item">
            <div className="image_wrapper">
              <img src={props.image} />
            </div>
            <div className="product_caption">
              <span className="soldby">Sold by: Nike</span>
              <div className="product_title">{props.title}</div>
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
                  <span className="main-price">Rs.{props.price}</span>
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