import { useCategories, useProducts } from "@/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filter from "shared/Components/Filter";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";
const Catalog = () => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState({});
  // Filter Pramas

  const [manufacturer, setManufacturer] = useState([]);
  const [price, setPrice] = useState([]);

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(
    offset,
    limit,
    "sku",
    router.query["category-slug"],
    manufacturer,
    price
  );

  useEffect(() => {
    setProducts({});
  }, [router.query["category-slug"], manufacturer, price]);

  useEffect(() => {
    isSuccess && setProducts({ ...products, ...data });
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };

  const manufacturerArray = [];
  const onFilter = (filter) => {
    const value = manufacturerArray.find(elem => elem === filter);
    if(value){
      console.log("here");
      manufacturerArray = manufacturerArray.filter(e => e !== filter);
    } else{
      manufacturerArray.push(filter);
    }
    // console.log(manufacturerArray);
    setManufacturer([...manufacturer,...manufacturerArray]);
  };

  const onPriceChange = (min, max) => {
    setPrice([min, max]);
  };

  const onClearHandeler = () => {
    setPrice([]);
    setManufacturer([]);
  }
  return (
    <CatalogStyle>
      <div className="filters">
        <Filter
          products={products}
          onFilter={onFilter}
          onPriceChange={onPriceChange}
          onClearHandeler={onClearHandeler}
        />
      </div>
      <div className="products">
        <div className="heading">
          <span className="category_title">
            {router.query["category-slug"]}
          </span>
          <span className="product_count">
            ({isSuccess && !!products && Object.keys(products).length})
          </span>
        </div>

        <div className="product_list">
          <Grid count={4} gap={12}>
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
    </CatalogStyle>
  );
};

export default Catalog;
