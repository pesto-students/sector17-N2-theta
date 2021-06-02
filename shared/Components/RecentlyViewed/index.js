import { useProducts } from "@/data";
import { useEffect, useState } from "react";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const RecentlyViewed = () => {  
  const [dataOffset, setDataOffset] = useState(0);
  const [dataLimit, setDataLimit] = useState(4);
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
            Recently Viewed Products
            <span className="heading-underline"></span>
          </h2>
        </HeadingStyle>
        <Grid className="" count={4} gap={20}>
        {dataLoading
          ? ""
          : Object.keys(products).map((product, index) => (
            <ProductCard
              key={index}
              {...products[product]}
            /> 
          ))}
        </Grid>
      </div>
    )
}

export default RecentlyViewed;