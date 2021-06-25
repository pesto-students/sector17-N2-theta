import GlobalContext from "@/appContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import SocialLogin from "shared/Components/SocialLogin";
import Grid from "shared/Styles/Grid";
import ProductCard from "shared/Components/ProductCard";
import { useProductsBySKU } from "@/data";
import ProfileSidebar from "shared/Components/ProfileSidebar";
import WishlistStyle from "./Style";
import MyAccountStyle from "../Style";

const Wishlist = () => {
    const [dataLimit, setDataLimit] = useState(9);
    const { user, isLogin, wishlistItems } = useContext(GlobalContext);
    const [products, setProducts] = useState();

    const { data, status, isLoading, isError } = useProductsBySKU(
        0,
        dataLimit,
        Array.isArray(wishlistItems) ? [...wishlistItems.slice(0,9)] : []
    );

    useEffect(() => {
        if (status === "success") {
            setProducts({ ...data });
        }
    }, [data, status]);

    return (
        <MyAccountStyle>
            <WishlistStyle>
                <div className="row_group wishlist-wrapper">
                    <ProfileSidebar />
                    <div className="dashboard">
                        {isLogin ? (
                            wishlistItems && wishlistItems.length > 0 ? (
                                <Grid count={3} gap={20}>
                                    {!isError &&
                                        products &&
                                        Object.keys(products).map(
                                            (product, index) => (
                                                <ProductCard
                                                    key={index}
                                                    id={product}
                                                    {...products[product]}
                                                />
                                            )
                                        )}
                                </Grid>
                            ) : (
                                <>
                                    There are no items in your wishlist.
                                    <br />
                                    <Link href="/">
                                        <a>Explore Sector17</a>
                                    </Link>
                                </>
                            )
                        ) : (
                            <ul>
                                <SocialLogin />
                            </ul>
                        )}
                    </div>
                </div>
            </WishlistStyle>
        </MyAccountStyle>
    );
};

export default Wishlist;
