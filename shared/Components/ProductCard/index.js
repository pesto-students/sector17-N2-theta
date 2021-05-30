import Link from "next/link";
import ProductCardStyle from "./Style";

const Product = (props) => {
  return (
    <ProductCardStyle>
      <div className="product_item">
        <img src="/images/product-img.png" />
        <div className="product_caption">
          <span className="soldby">Sold by: Nike</span>
          <div className="product_title"><Link href="/product"> Product 1</Link></div>
          <div className="stars">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="count">149</span>
          </div>
          <div className="row_group">
            <div className="product_price">
              Rs. 100 <span>Rs. 150</span>
            </div>
            <div className="addtocart">
              <button>
                <span className="text">Add to Cart</span>
                <span className="plus">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProductCardStyle>
  );
};
export default Product;
