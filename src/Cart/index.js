import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import firebase from "../../data/firebase";
import { getSellers, getProducts } from "../../data/firestore/sellers";
import GlobalContext from "../../context/GlobalContext";
import getCouponDiscount from "../../shared/Utils/getCouponDiscount";
import CartProducts from "./Products";
import CartSummary from "./Summary";
import CartStyle from "./Style";

const Cart = (props) => {
  const router = useRouter();
  const { showSummary } = props;
  const dataLimit = 20;
  const page = router.asPath === "/checkout" ? "checkout" : "cart";
  const [showPage, setShowPage] = useState(false);
  const [products, setProducts] = useState({});
  const [cartItemsSku, setCartItemsSku] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState();
  const { cartPriceDetails, setCartPriceDetails, cartItems, setCartProducts, setCartItemSellers } = useContext(GlobalContext);

  const preparePriceDetails = (data) => {
    let subTotal = 0;

    Object.keys(cartItems).map((sku) => {
      if (data[sku]) {
        subTotal += data[sku].price * cartItems[sku].qty;
      }
    });

    const couponInfo = getCouponDiscount(subTotal);

    setCartPriceDetails({
      ...cartPriceDetails,
      subTotal,
      discount: 0,
      coupon: couponInfo.coupon,
      couponDiscount: couponInfo.discount,
      total: couponInfo.coupon ? subTotal - couponInfo.discount : subTotal,
    });
  };

  const useSellersById = async (offset = 0, limit = 10, id = []) => {
    const sellers = await getSellers({
      offset,
      limit,
      orderBy: firebase.firestore.FieldPath.documentId(),
      id,
    });

    return sellers
  }

  const useProductsBySKU = async (offset = 0, limit = 10, sku = []) => {
    const items = await getProducts({
      offset,
      limit,
      orderBy: firebase.firestore.FieldPath.documentId(),
      sku,
    })

    return items;
  }

  useEffect(() => {
    async function prepareSellers(data){
      const sellers = [];
  
      Object.keys(cartItems).map((sku) => {
        if(data[sku]){
          const {seller} = data[sku];
          if(sellers.indexOf(seller) < 0){
            sellers.push(seller);
          }
        }
      });
  
      const sellerData = await useSellersById(
        0,
        dataLimit,
        [...sellers]
      )
  
      setCartItemSellers(sellerData);
    }

    async function handleCartData(skuList) {
      const data = await useProductsBySKU(
        0,
        dataLimit,
        [...skuList]
      );

      if(data){
        setProducts({ ...data });
        preparePriceDetails(data);
        setShowPage(true);
        setCartProducts(data)
        prepareSellers(data);
      }
    }

    if(cartItems){
      const skuList = Object.keys(cartItems).map((sku) => parseInt(sku));
      setCartItemsCount(skuList.length);
      setCartItemsSku(skuList);
      handleCartData(skuList);
    }else if (router.asPath === '/checkout') {
      router.push("/cart");
    }
  }, [cartItems]);

  if(page === 'checkout' && !showSummary){
    return null
  }

  return cartItems ? (
    <div style={{ opacity: showPage || cartItemsCount === 0 ? "1" : "0" }}>
      {cartItemsCount > 0 ? (
        <CartStyle>
          <div className='products'>
            {page !== 'checkout' && <h1>My Cart ({cartItemsCount})</h1>}

            {products && <CartProducts
              cartItemsSku={cartItemsSku}
              preparePriceDetails={preparePriceDetails}
              setShowPage={setShowPage}
              products={products}
            />}

            {page !== 'checkout' && <div className='continue-shopping'>
              <Link href='/'>
                <a>Continue Shopping</a>
              </Link>
            </div>}
            
          </div>

          <CartSummary
            cartPriceDetails={cartPriceDetails}
            cartItemsCount={cartItemsCount}
            setCartPriceDetails={setCartPriceDetails}
          />
        </CartStyle>
      ) : page !== "checkout" && (
        <CartStyle emptyCart>
          No Items in Your Cart
          <br />
          <Link href='/'>
            <a>Explore Products</a>
          </Link>
        </CartStyle>
      )}
    </div>
  ) : null;
};

export default Cart;
