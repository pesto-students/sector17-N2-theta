import useCategories from "@/data/hooks/use-categories";
import { useSingleProduct } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from "shared/Styles/Grid";
import HeadingStyle from "shared/Styles/HeadingStyle";
import ProductDetailStyle from "./Style";

const Product = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useSingleProduct(router.query["product-slug"]);

  //   const {
  //     data: categories = {},
  //   } = useCategories(0,4,product.category);
  // console.log(categories);

  const onQtyDecreaseHandler = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };
  const onQtyIncreaseHandler = () => {
    setQty(qty + 1);
  };
  return (
    router && (
      <div>
        <ProductDetailStyle>
          <ul className="breadcrumbs">
            <li>Home</li>
            <li>Products</li>
            <li>{product.category}</li>
            <li>{product.name}</li>
          </ul>
          {isSuccess && !!product && (
            <Grid count={2} gap={20}>
              <div className="product_gallery">
                <div className="product_thumbnail">
                  <ul>
                    <li>
                      <img src="/images/product-img.png" />
                    </li>
                    <li>
                      <img src="/images/product-img.png" />
                    </li>
                  </ul>
                </div>
                <div className="product_full">
                  <img src={product.image} />
                </div>
              </div>
              <div className="product_info">
                <h1 className="product_title">{product.name}</h1>

                <div className="review">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <span className="count">149 Reviews</span>
                </div>
                <div className="price">
                  <span className="main-price">Rs.{product.price}</span>
                  <span className="stike-through">Rs.150</span>
                </div>

                <div className="qty">
                  <ul>
                    <li>Quantity</li>
                    <li>
                      <div>
                        <button onClick={onQtyDecreaseHandler}>-</button>
                        <span>{qty}</span>
                        <button onClick={onQtyIncreaseHandler}>+</button>
                      </div>
                    </li>
                  </ul>
                </div>

                <button className="add-to-cart">
                  <span className="text">Add to Cart</span>
                </button>

                <div className="extra_option">
                  <label>DELIVER OPTIONS</label>
                  <input type="text" placeholder="Enter a PIN code" />
                  <button>CHECK</button>
                </div>
                <span>
                  PLease enter PIN code to check delivery time & Pay on Delivery
                  Availability
                </span>
              </div>
            </Grid>
          )}

          {isSuccess && !!product && (
            <div className="">
              <HeadingStyle>
                <h2 className="heading">
                  Product Description
                  <span className="heading-underline"></span>
                </h2>
              </HeadingStyle>
              <div className="description">
                {product.description}
                <div>
                  <table>
                    <tr>
                      <th>Manufacturer</th>
                      <td>{product.manufacturer}</td>
                    </tr>
                    <tr>
                      <th>Model</th>
                      <td>{product.model}</td>
                    </tr>
                  </table>
                  <table>
                    <tr>
                      <th>SKU</th>
                      <td>{product.sku}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{product.type}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <HeadingStyle>
                <h2 className="heading">
                  Similar Products
                  <span className="heading-underline"></span>
                </h2>
              </HeadingStyle>

              <Grid className="" count={2} gap={20}>
                {/* {Object.keys(categories).map((category) => (
            <CategoryCard
              key={category}
              id={categories[category].id}
              name={categories[category].name}
              image={categories[category].image}
            />
          ))} */}
              </Grid>
            </div>
          )}
        </ProductDetailStyle>
      </div>
    )
  );
};

export default Product;
