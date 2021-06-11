import { useProducts } from "@/data";
import { useState } from "react";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const TopTrendingProducts = (props) => {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(8);

    const {
        data: products = {},
        isLoading,
        isSuccess,
    } = useProducts(offset, limit, "sku");

    return (
        <div className="top-trending-products">
            <HeadingStyle>
                <h2 className="heading">
                    Top Trending Products
                    <span className="heading-underline"></span>
                </h2>
            </HeadingStyle>
            <Grid count={4} gap={20}>
                {isSuccess &&
                    !!products &&
                    Object.keys(products).map((product, index) => (
                        <ProductCard
                            key={index}
                            id={product}
                            {...products[product]}
                        />
                    ))}
            </Grid>
        </div>
    );
};

export default TopTrendingProducts;
