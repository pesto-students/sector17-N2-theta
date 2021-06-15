import GlobalContext from "@/appContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import SocialLogin from "shared/Components/SocialLogin";
import WishlistStyle from "./Style";
import Grid from "shared/Styles/Grid";
import ProductCard from "shared/Components/ProductCard";
import { useProductsBySKU } from "@/data";
import ProfileSidebar from "shared/Components/ProfileSidebar";
import MyAccountStyle from "../Style";


const Wishlist = () => {
  const [dataLimit, setDataLimit] = useState(16);
  const {user, isLogin, wishlistItems} = useContext(GlobalContext);
  const [products, setProducts] = useState();

  const { data, status, isLoading, isError } = useProductsBySKU(
    0,
    dataLimit,
    wishlistItems ? [...wishlistItems] : []
  );

  useEffect(() => {
    if (status === "success") {
      setProducts({ ...data });
    }
  }, [status]);

  return (
    <MyAccountStyle>
      <div className="row_group">
        <ProfileSidebar />
        <div className="dashboard">
          {isLogin ? (
            wishlistItems && wishlistItems.length > 0 ? (
              <WishlistStyle>
                <Grid count={4} gap={15}>
                  {!isError && products &&
                    Object.keys(products).map((product, index) => (
                      <ProductCard key={index} id={product} {...products[product]} />
                  ))}
                </Grid>
              </WishlistStyle>
            ) : (
              <WishlistStyle>
                There are no items in your wishlist.
                <br />
                <Link href="/">
                  <a>Explore Sector17</a>
                </Link>
              </WishlistStyle>
            )
          ) : (
            <ul>
              <SocialLogin />
            </ul>
          )}
        </div>
      </div>
    </MyAccountStyle>
    
  )
}

export default Wishlist;