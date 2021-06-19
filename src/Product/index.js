import useProducts, { useSingleProduct } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { useState } from "react";
import Head from "next/head";
import ProductCard from "shared/Components/ProductCard";
import Grid from "shared/Styles/Grid";
import HeadingStyle from "shared/Styles/HeadingStyle";
import AddToCart from "shared/Utils/AddToCart";
import Breadcrumbs from "shared/Components/Breadcrumbs";
import { useSingleCategory } from "@/data/hooks/use-categories";
import Quantity from "shared/Components/Quantity";
import ProductDetailStyle from "./Style";

const AddToRecentlyViewed = dynamic(
  () => import("../../shared/Utils/AddToRecentlyViewed"),
  {
    ssr: false,
  }
);

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
    if (resData.distance.status === "OK") {
      if (resData.distance.rows[0].elements[0].status === "NOT_FOUND") {
        setDelivery("Pincode is Invalid");
        throw new Error("Pincode is Invalid");
      } else {
        localStorage.setItem("pincode", destinationPincode);
        let deliveryMessage = "";
        const distacne =
          resData.distance.rows[0].elements[0].distance.text.split(" ");
        if (distacne[0] > 0 && distacne[0] <= 20) {
          deliveryMessage = "Delivery in 1 Working days";
        } else if (distacne[0] > 20 && distacne[0] <= 250) {
          deliveryMessage = "Delivery in 2 Working days";
        } else if (distacne[0] > 250 && distacne[0] <= 500) {
          deliveryMessage = "Delivery in 3 Working days";
        } else if (distacne[0] > 500 && distacne[0] <= 750) {
          deliveryMessage = "Delivery in 4 Working days";
        } else if (distacne[0] > 750 && distacne[0] <= 1000) {
          deliveryMessage = "Delivery in 5 Working days";
        } else {
          deliveryMessage = "Delivery in 10 Working days";
        }
        setDelivery(deliveryMessage);
      }
    } else {
      setDelivery("Something is wrong with selection");
      throw new Error("Something is wrong with selection");
    }
  };

  if (isLoading) {
    return (
      router && (
        <div>
          <ProductDetailStyle>
            <Skeleton />
            <div className="product_view_container">
              <Grid count={2} gap={20}>
                <div className="product_gallery">
                  <div className="product_thumbnail">
                    <ul>
                      <li>
                        <Skeleton height={50} width={50}/>
                      </li>
                      <li>
                        <Skeleton height={50} width={50} />
                      </li>
                    </ul>
                  </div>
                  <div className="product_full">
                    <Skeleton height={350} width={350} />
                  </div>
                </div>
                <div className="product_info">
                  <h1 className="product_title">
                    <Skeleton />
                  </h1>

                  <div className="review">
                    <Skeleton />
                  </div>
                  <div className="price">
                    <span className="main-price">
                      <Skeleton height={50} />
                    </span>
                    <span className="stike-through" />
                  </div>

                  <Skeleton height={20} />
                  <Skeleton height={20} />

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
                    <span className="heading-underline" />
                  </h2>
                </HeadingStyle>
                <div className="description">
                  <Skeleton count={5} />
                  <div>
                    <table>
                      <tr>
                        <th>Manufacturer</th>
                        <td>
                          <Skeleton count={1} />
                        </td>
                      </tr>
                      <tr>
                        <th>Model</th>
                        <td>
                          <Skeleton count={1} />
                        </td>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <th>SKU</th>
                        <td>
                          <Skeleton count={1} />
                        </td>
                      </tr>
                      <tr>
                        <th>Type</th>
                        <td>
                          <Skeleton count={1} />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <HeadingStyle>
                  <h2 className="heading">
                    Similar Products
                    <span className="heading-underline" />
                  </h2>
                </HeadingStyle>

                <Grid className="" count={4} gap={20}>
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                </Grid>
              </div>

              <Skeleton count={1} />
            </div>
          </ProductDetailStyle>
        </div>
      )
    );
  }

  return (
    router && (
      <div>
        <ProductDetailStyle>
            <Head>
                <title>{product.name } | Sector 17</title>
            </Head>
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
                    <div className="product_thumbnail" />
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
                      <span className="stike-through" />
                    </div>

                    <Quantity
                      onQtyUpdate={setQty}
                      quantity={qty}
                      from="product"
                    />

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
                      <span className="heading-underline" />
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
                      <span className="heading-underline" />
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
