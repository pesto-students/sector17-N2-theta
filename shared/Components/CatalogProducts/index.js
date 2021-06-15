import { useProducts } from "@/data";
import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCard from "../ProductCard";
import Grid from "../../Styles/Grid";

const CatalogProducts = (props) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState({});
  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const currentPage = router.query["category-slug"];

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(
    offset,
    limit,
    "sku",
    currentPage,
    manufacturerFilter,
    priceFilter
  );

  useEffect(() => {
    if (router.query["price"] && router.query["price"] != "") {
      setPriceFilter(router.query["price"].split(","));
    }
    if (router.query["manufacturer"] && router.query["manufacturer"] != "") {
      setManufacturerFilter(router.query["price"].split(","));
    }
    console.log("Price Filter ", priceFilter);
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (router.query["price"] && router.query["price"] != "") {
        setPriceFilter(router.query["price"].split(","));
      }
      if (router.query["manufacturer"] && router.query["manufacturer"] != "") {
        setManufacturerFilter(router.query["manufacturer"].split(","));
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [manufacturerFilter, priceFilter]);

  useEffect(() => {
    !isLoading && setProducts({ ...data });
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };

  if (isLoading) {
    return (
      <div>
        <div className="heading"></div>

        <div className="product_list">
          <Grid count={4} gap={15}>
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
      </div>
    );
  }

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
