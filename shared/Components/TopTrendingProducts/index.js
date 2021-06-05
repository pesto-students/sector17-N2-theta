import { useProducts } from "@/data";
import { useEffect, useState } from "react";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const TopTrendingProducts = (props) => {  
  const [dataOffset, setDataOffset] = useState(0);
  const [dataLimit, setDataLimit] = useState(8);
  const [products, setProducts] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const { data, status, isLoading, isError } = useProducts(
    dataOffset,
    dataLimit
  );
  
  useEffect(() => {
    setProducts(data);
    if (products !== null) {
      setDataLoading(false);
    }
  }, [data, setProducts, setDataLoading]);

  return (
    <div className="top-trending-products">
      <HeadingStyle>
        <h2 className="heading">
          Top Trending Products
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      <Grid count={4} gap={20}>
        {dataLoading
          ? ""
          : Object.keys(products).map((product, index) => (
          <ProductCard
            key={index}
            slug={products[product].slug}
            title={products[product].name}
            price={products[product].price}
            image={products[product].image}
          />
        ))}
      </Grid>
    </div>
  );
};

export default TopTrendingProducts;
