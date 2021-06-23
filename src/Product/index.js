import { useSingleProduct } from '@/data/hooks/use-products';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Grid from 'shared/Styles/Grid';
import HeadingStyle from 'shared/Styles/HeadingStyle';
import AddToCart from 'shared/Utils/AddToCart';
import Breadcrumbs from 'shared/Components/Breadcrumbs';
import { useSingleCategory } from '@/data/hooks/use-categories';
import Quantity from 'shared/Components/Quantity';
import SimilarProducts from '../../shared/Components/SimilarProducts';
import ProductDetailStyle from './Style';
import { AddToWishlistButton } from '../../shared/Utils/AddToWishlist';
import { useSingleSeller } from '@/data/hooks/use-sellers-by-id';

const AddToRecentlyViewed = dynamic(
  () => import('../../shared/Utils/AddToRecentlyViewed'),
  {
    ssr: false
  }
);

const Product = () => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState();
  const [pincode, setPincode] = useState();
  const [sellderId, setSellerId] = useState();
  const [sellderPincode, setSellerPincode] = useState();

  const {
    data: product = {},
    isLoading,
    isSuccess
  } = useSingleProduct(router.query['product-slug']);

  const { data: seller, isLoading: isSellerLoading } =
    useSingleSeller(sellderId);

  const { data: category = {}, isLoading: categoryLoading } = useSingleCategory(
    product.category
  );

  useEffect(() => {
    if (!isLoading) {
      setSellerId(product.seller);
    }
    if (!isSellerLoading) {
      setSellerPincode(seller.pincode);
    }
  }, [product, seller]);

  const validatePincode = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    if (event.target.value.length >= 6) {
      event.preventDefault();
    }
  };

  const onPincodeHandler = async event => {
    event.preventDefault();

    const originPincode = sellderPincode;
    const destinationPincode = pincode;
    const data = { origin: originPincode, destination: destinationPincode };
    const response = await fetch(`/api/pincode-distance`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const resData = await response.json();
    if (resData.distance.status === 'OK') {
      console.log(resData);
      if (resData.distance.rows[0].elements[0].status === 'ZERO_RESULTS') {
        setDelivery('Pincode is Invalid');
        throw new Error('Pincode is Invalid');
      }
      if (resData.distance.rows[0].elements[0].status === 'NOT_FOUND') {
        setDelivery('Pincode is Invalid');
        throw new Error('Pincode is Invalid');
      } else {
        localStorage.setItem('pincode', destinationPincode);
        let deliveryMessage = '';
        const distacne =
          resData.distance.rows[0].elements[0].distance.text.split(' ');
        if (distacne[0] > 0 && distacne[0] <= 20) {
          deliveryMessage = 'Delivery in 1 Working days';
        } else if (distacne[0] > 20 && distacne[0] <= 250) {
          deliveryMessage = 'Delivery in 2 Working days';
        } else if (distacne[0] > 250 && distacne[0] <= 500) {
          deliveryMessage = 'Delivery in 3 Working days';
        } else if (distacne[0] > 500 && distacne[0] <= 750) {
          deliveryMessage = 'Delivery in 4 Working days';
        } else if (distacne[0] > 750 && distacne[0] <= 1000) {
          deliveryMessage = 'Delivery in 5 Working days';
        } else {
          deliveryMessage = 'Delivery in 10 Working days';
        }
        setDelivery(deliveryMessage);
      }
    } else {
      setDelivery('Something is wrong with your selection');
      throw new Error('Something is wrong with your selection');
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
                        <Skeleton height={50} width={50} />
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
                        onChange={event => setPincode(event.target.value)}
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
                <div className="description">
                  <Skeleton count={5} />
                </div>
              </div>
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
            <title>{product.name} | Sector 17</title>
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
                      <span className="count"></span>
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

                    <div className="wishlist-btn">
                      <AddToWishlistButton productSku={product.sku} />
                    </div>

                    <div className="extra_option">
                      <label>DELIVER OPTIONS</label>
                      <div className="pincode_input">
                        <input
                          type="text"
                          placeholder="Enter a PIN code"
                          onKeyPress={validatePincode}
                          onChange={event => setPincode(event.target.value)}
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
                        <tbody>
                          <tr>
                            <th>Manufacturer</th>
                            <td>{product.manufacturer}</td>
                          </tr>
                          <tr>
                            <th>Model</th>
                            <td>{product.model}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table>
                        <tbody>
                          <tr>
                            <th>SKU</th>
                            <td>{product.sku}</td>
                          </tr>
                          <tr>
                            <th>Type</th>
                            <td>{product.type}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <SimilarProducts category={product.category} />
              </div>
            </>
          )}
        </ProductDetailStyle>
      </div>
    )
  );
};

export default Product;
