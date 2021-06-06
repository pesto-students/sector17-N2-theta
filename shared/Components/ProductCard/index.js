import Link from "next/link";
import dynamic from 'next/dynamic'
import ProductCardStyle from "./Style";

const AddToCart = dynamic(() => import("shared/Utils/AddToCart"), {
  ssr: false
});

const ProductCard = (props) => {
  const { image, title, price, sku, slug } = props;

  return (
    <ProductCardStyle>
      <Link href="/categories/[category-slug]/[product-slug]" as={`/categories/${props.category}/${props.id}`}>
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

      <AddToCart productSku={ sku } quantity={1} />
    </ProductCardStyle>
  );
};
export default ProductCard;
