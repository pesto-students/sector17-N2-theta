import useProducts, { useSingleProduct } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AddToRecentlyViewed = dynamic(
  () => import("../../shared/Utils/AddToRecentlyViewed"),
  {
    ssr: false,
  }
);

import { useState } from "react";
import ProductCard from "shared/Components/ProductCard";
import Grid from "shared/Styles/Grid";
import HeadingStyle from "shared/Styles/HeadingStyle";
import ProductDetailStyle from "./Style";
import AddToCart from "shared/Utils/AddToCart";
import Breadcrumbs from "shared/Components/Breadcrumbs";
import axios from "axios";
import { useSingleCategory } from "@/data/hooks/use-categories";
import Quantity from "shared/Components/Quantity";

const Product = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState();
  const [pincode, setPincode] = useState();

  const {
    data: product = {},
    isLoading,
    isSuccess,
  } = useSingleProduct(router.query["product-slug"]);

  const { data: category = {}, isLoading: categoryLoading } = useSingleCategory(
    product.category
  );
  // Similer Products
  const { data: products = {} } = useProducts(0, 4, "sku", product.category);
  console.log(product.category);

  const onPincodeHandler = async (event) => {
    event.preventDefault();
    const originPincode = 143001;
    const destinationPincode = pincode;
    const data = { origin: originPincode, destination: destinationPincode };
    const response = await fetch(`/api/pincode-distance`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resData = await response.json();
    if (resData.name.status === "OK") {
      if (resData.name.rows[0].elements[0].status === "NOT_FOUND") {
        setDelivery("Pincode is Invalid");
      } else {
        localStorage.setItem("pincode", destinationPincode);
        let deliveryMessage = "";
        const distacne =
          resData.name.rows[0].elements[0].distance.text.split(" ");
        if (distacne[0] > 0 && distacne[0] <= 20) {
          deliveryMessage = "1 Working Day Delivery";
        } else if (distacne[0] > 20 && distacne[0] <= 250) {
          deliveryMessage = "2 Working Days Delivery";
        } else if (distacne[0] > 250 && distacne[0] <= 500) {
          deliveryMessage = "3 Working Days Delivery";
        } else if (distacne[0] > 500 && distacne[0] <= 750) {
          deliveryMessage = "4 Working Days Delivery";
        } else if (distacne[0] > 750 && distacne[0] <= 1000) {
          deliveryMessage = "5 Working Days Delivery";
        } else {
          deliveryMessage = "10 Working Days Delivery";
        }
        setDelivery(deliveryMessage);
      }
    } else {
      setDelivery("Something is wrong with selection");
    }
  };
  return (
    router && (
      <div>
        <ProductDetailStyle>
          {!categoryLoading && (
            <Breadcrumbs
              parent="Products"
              parentLink={`/categories/${product.category}`}
              subparent={category.name}
              subparentLink={`/categories/${product.category}`}
              current={product.name}
            />
          )}
          {isSuccess && !!product && (
            <>
              <div className="product_view_container">
                <Grid count={2} gap={20}>
                  <div className="product_gallery">
                    <div className="product_thumbnail">
                      {/* <ul>
                        <li>
                          <img src="/images/product-img.png" />
                        </li>
                        <li>
                          <img src="/images/product-img.png" />
                        </li>
                      </ul> */}
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

                    <Quantity onQtyUpdate={setQty} from="product" />

                    <AddToCart productSku={product.sku} quantity={qty}>
                      Add to Cart
                    </AddToCart>

                    <div className="extra_option">
                      <label>DELIVER OPTIONS</label>
                      <div className="pincode_input">
                        <input
                          type="text"
                          placeholder="Enter a PIN code"
                          onChange={(event) => setPincode(event.target.value)}
                        />
                        <button onClick={onPincodeHandler}>CHECK</button>
                      </div>

                      <span>
                        Please enter PIN code to check delivery time & Pay on
                        Delivery Availability
                      </span>
                      {delivery}
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
              </div>
            </>
          )}
        </ProductDetailStyle>
      </div>
    )
  );
};

export default Product;
