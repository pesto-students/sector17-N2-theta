import Link from "next/link";
import dynamic from "next/dynamic";
import ProductCardStyle from "./Style";
import { AddToWishlistButton } from "shared/Utils/AddToWishlist";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AddToCart = dynamic(() => import("shared/Utils/AddToCart"), {
  ssr: false,
});

const ProductCard = (props) => {
  const { image, name: title, price, sku, slug } = props;

  return (
    <ProductCardStyle>
      <Link
        href="/categories/[category-slug]/[product-slug]"
        as={`/categories/${props.category}/${props.id}`}
      >
        <a>
          <div className="product_item">
            <div className="image_wrapper">
              {image ? <img src={image} /> : <Skeleton height={200} />}
            </div>
            <div className="product_caption">
              <span className="soldby">&nbsp;</span>
              <div className="product_title">
                {title || <Skeleton height={20} />}
              </div>
              <div className="review">
                {title ? (
                  <>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span className="count"></span>
                  </>
                ) : (
                  <Skeleton height={20} />
                )}
              </div>
              <div className="row_group">
                <div className="price">
                  <span className="main-price">
                    {price ? <span>Rs.{price}</span> : <Skeleton height={20} />}
                  </span>
                  <span className="stike-through"></span>
                </div>
                <div className="add-to-cart-placeholder"></div>
              </div>
            </div>
          </div>
        </a>
      </Link>

      {sku ? (
        <AddToCart productSku={sku} quantity={1} />
      ) : (
        <Skeleton height={20} />
      )}

      {sku ? (
        <AddToWishlistButton productSku={sku} />
      ) : (
        <Skeleton height={20} />
      )}
    </ProductCardStyle>
  );
};
export default ProductCard;
