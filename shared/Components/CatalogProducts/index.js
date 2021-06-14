import { useProducts } from "@/data";
import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProductCard from "../ProductCard";
import Grid from "../../Styles/Grid";

const CatalogProducts = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState({});
  const [priceFilter, setPriceFilter] = useState([]);

  const currentPage = router.query["category-slug"];

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(offset, limit, "sku", currentPage, props.manufacturer, priceFilter);


  useEffect(()=>{
      if(router.query["price"] && router.query["price"]!=""){
          console.log("price filter");
        setPriceFilter(router.query["price"].split(","));
      }
  },[]);

  useEffect(() => {
      !isLoading && setProducts({...data});
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };



  return (
    <div>
      <div className="heading">
        <span className="category_title">
          {!props.categoryLoading && props.singleCategory.name}
        </span>
        <span className="product_count">
          ({isSuccess && !!products && Object.keys(products).length})
        </span>
      </div>

      <div className="product_list">
        <Grid count={4} gap={15}>
          {!!products &&
            Object.keys(products).map((product, index) => (
              <ProductCard key={index} id={product} {...products[product]} />
            ))}
        </Grid>

        {!!products &&
          ((Object.keys(data).length > 0 &&
            Object.keys(data).length === limit) ||
            isLoading) && (
            <button className="btn" disabled={isLoading} onClick={loadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
      </div>
    </div>
  );
};
export default CatalogProducts;
