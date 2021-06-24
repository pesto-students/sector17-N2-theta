import useProducts, { useSingleProduct } from '@/data/hooks/use-products';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Grid from 'shared/Styles/Grid';
import HeadingStyle from 'shared/Styles/HeadingStyle';
import AddToCart from 'shared/Utils/AddToCart';
import Breadcrumbs from 'shared/Components/Breadcrumbs';
import { useSingleCategory } from '@/data/hooks/use-categories';
import Quantity from 'shared/Components/Quantity';
import SimilarProducts from '../SimilarProducts';
import SingleProductStyle from './Style';
import { AddToWishlistButton } from '../../Utils/AddToWishlist';
import { useSingleSeller } from '@/data/hooks/use-sellers-by-id';
import ProductCard from '../ProductCard';

const AddToRecentlyViewed = dynamic(
  () => import('../../Utils/AddToRecentlyViewed'),
  {
    ssr: false
  }
);

const SingleProduct = () => {
    const router = useRouter();
  const pincodeCheckRef = useRef(null);
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState();
  const [pincode, setPincode] = useState();
  const [sellderId, setSellerId] = useState();
  const [sellderPincode, setSellerPincode] = useState();
  const [pincodeValidate, setPincodeValidate] = useState('');
  const [loading, setLoading] = useState(false);

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

  const { data: products = {}, isLoading: similerLoading } = useProducts(0, 4, 'sku', product.category);
  useEffect(() => {
    if (!isLoading) {
      const sellerId = product && product.seller;
      setSellerId(sellerId);
    }
  }, [product]);
  
  useEffect(() => {
    if (!isSellerLoading) {
      const sPincode = seller && seller.pincode;
      setSellerPincode(sPincode);
    }
  }, [seller]);


  const getApi = async data => {
    if (data) {
      const response = await fetch(`/api/pincode-distance`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    }
  };

  const onPincodeHandler = event => {
    event.preventDefault();
    setLoading(true);
    if (pincode === '') {
      setDelivery('Please enter Pincode');
      throw new Error('Please enter Pincode');
    }
    const originPincode = sellderPincode;
    const destinationPincode = pincode ?? '';
    const data = { origin: originPincode, destination: destinationPincode };

    getApi(data)
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.distance.status === 'OK') {
          if (resData.distance.rows[0].elements[0].status === 'ZERO_RESULTS') {
            setDelivery('Pincode is Invalid');
            setLoading(false);
            throw new Error('Pincode is Invalid');
          }
          if (resData.distance.rows[0].elements[0].status === 'NOT_FOUND') {
            setDelivery('Pincode is Invalid');
            setLoading(false);
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
            setLoading(false);
          }
        } else {
          setDelivery('Something is wrong with your selection');
          throw new Error('Something is wrong with your selection');
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };
  useEffect(() => {
    const pincodeFromLocalStorage = localStorage.getItem('pincode');    
    if (pincodeFromLocalStorage && pincodeFromLocalStorage !== '' && sellderPincode !='') {
      setPincode(pincodeFromLocalStorage);
      setPincodeValidate('valid');
      setTimeout(() => {
        pincodeCheckRef.current.click();
      }, 1000);
    }
  }, [sellderPincode]);

  const validatePincode = event => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
      setPincodeValidate('error');
    }
    if (event.target.value.length >= 6) {
      event.preventDefault();
    }
    setPincodeValidate('valid');
  };

  if (isLoading) {
    return (
      router && (
        <div>
          <SingleProductStyle>
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
                      <input type="text" placeholder="Enter a PIN code" />
                      <button>CHECK</button>
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
          </SingleProductStyle>
        </div>
      )
    );
  }

  return (
    router && (
      <div>
        <SingleProductStyle>
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
                      <form onSubmit={onPincodeHandler}>
                        <div className="pincode_input">
                          <input
                            type="text"
                            placeholder="Enter a PIN code"
                            onKeyPress={validatePincode}
                            onChange={event => setPincode(event.target.value)}
                            defaultValue={pincode}
                          />
                          <button
                            type="submit"
                            ref={pincodeCheckRef}
                            className={pincodeValidate}
                          >
                            {loading ? (
                              <>
                                <i className="fa fa-spin fa-spinner" />{' '}
                                Validating
                              </>
                            ) : (
                              'CHECK'
                            )}
                          </button>
                        </div>
                      </form>

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
                <div>
      <HeadingStyle>
        <h2 className="heading">
          Similar Products
          <span className="heading-underline" />
        </h2>
      </HeadingStyle>

      <Grid className="" count={4} gap={20}>
        {!!products &&
          Object.keys(products).map((product, index) => (
            <ProductCard key={index} id={product} {...products[product]} />
          ))}
      </Grid>
    </div>
                {/* <SimilarProducts category={product.category} /> */}
              </div>
            </>
          )}
        </SingleProductStyle>
      </div>
    )
  );
};

export default SingleProduct;
