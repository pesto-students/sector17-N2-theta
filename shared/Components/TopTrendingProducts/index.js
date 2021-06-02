import { useProducts } from "@/data";
import { useEffect, useState } from "react";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const TopTrendingProducts = (props) => {  
  const [dataLimit, setDataLimit] = useState(8);
  const [products, setProducts] = useState({});
  const { data, status, isLoading, isError } = useProducts(
    0,
    dataLimit
  );
  
  useEffect(() => {
    if (status === "success") {
      setProducts({ ...products, ...data });
    }
  }, [status]);

  return (
    <div className="top-trending-products">
      <HeadingStyle>
        <h2 className="heading">
          Top Trending Products
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      <Grid count={4} gap={20}>
        {!isError && Object.keys(products).map((product, index) => (
          <ProductCard
            key={index}
            id={product}
            category={products[product].category}
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
