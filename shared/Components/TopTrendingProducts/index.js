import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import  useProducts  from "../../../data/hooks/use-products";
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
  } = useProducts(offset, limit, "sku", "topcat000100");

  if (isLoading) {
    return (
      <div className="top-trending-products" role="loading">
        <HeadingStyle>
          <h2 className="heading">
            <Skeleton />
          </h2>
        </HeadingStyle>
        <Grid count={4} gap={20}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </div>
    );
  }

  return (
    <div className="top-trending-products">
      <HeadingStyle>
        <h2 className="heading">
          Top Trending Products
          <span className="heading-underline" />
        </h2>
      </HeadingStyle>
      <Grid count={4} gap={20}>
        {isSuccess &&
          !!products &&
          Object.keys(products).map((product, index) => (
            <ProductCard key={index} id={product} {...products[product]} />
          ))}
      </Grid>
    </div>
  );
};

export default TopTrendingProducts;
