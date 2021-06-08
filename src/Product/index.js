import useProducts, { useSingleProduct } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AddToRecentlyViewed = dynamic(
  () => import("../../shared/Utils/AddToRecentlyViewed"),
  {
    ssr: false,
  }
);

import { useEffect, useState } from "react";
import ProductCard from "shared/Components/ProductCard";
import Grid from "shared/Styles/Grid";
import HeadingStyle from "shared/Styles/HeadingStyle";
import ProductDetailStyle from "./Style";
import AddToCart from "shared/Utils/AddToCart";
import Breadcrumbs from "shared/Components/Breadcrumbs";
import axios from "axios";

const Product = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useSingleProduct(router.query["product-slug"]);

  // Similer Products
  const { data: products = {} } = useProducts(0, 4, "sku", product.category);
  console.log(product.category);

  const onQtyDecreaseHandler = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };
  const onQtyIncreaseHandler = () => {
    setQty(qty + 1);
  };

  const onPincodeHandler = async () => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=143001&destinations=110059&key=AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          "Authorization": "AIzaSyBLuKZYUJThQeaN2OuyQFXHangMdmwyjuo",
        },
      }
    );
    console.log(response);
  };
  return (
    router && (
      <div>
        <ProductDetailStyle>
          <Breadcrumbs
            parent="Products"
            parentLink={`/categories/${product.category}`}
            subparent={product.category}
            subparentLink={`/categories/${product.category}`}
            current={product.name}
          />
          {isSuccess && !!product && (
            <>
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

                  <AddToCart productSku={product.sku} quantity={qty}>
                    Add to Cart
                  </AddToCart>

                  <div className="extra_option">
                    <label>DELIVER OPTIONS</label>
                    <div className="pincode_input">
                      <input type="text" placeholder="Enter a PIN code" />
                      <button onClick={onPincodeHandler}>CHECK</button>
                    </div>

                    <span>
                      Please enter PIN code to check delivery time & Pay on
                      Delivery Availability
                    </span>
                  </div>
                </div>
              </Grid>

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

                <Grid className="" count={4} gap={20}>
                  {!!products &&
                    Object.keys(products).map((product, index) => (
                      <ProductCard
                        key={index}
                        id={product}
                        {...products[product]}
                      />
                    ))}
                </Grid>
              </div>

              <AddToRecentlyViewed productSku={product.sku} />
            </>
          )}
        </ProductDetailStyle>
      </div>
    )
  );
};

export default Product;
