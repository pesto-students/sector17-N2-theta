import { useProducts } from "@/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";
const Catalog = () => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState({});

  const { data, isLoading, isSuccess } = useProducts(
    offset,
    limit,
    "sku",
    router.query["category-slug"]
  );
  useEffect(() => {
    if(isSuccess){
        setProducts({ ...products, ...data });
    }
  }, [data]);

  const loadMore = () => {
    const offset = Object.keys(products)[Object.keys(products).length - 1];
    setOffset(offset);
    console.log(offset);
  };

  return (
    <CatalogStyle>
      <div className="filters">
        <div class="filter_action">
          <span>Filters</span>
          <span>Filters</span>
        </div>
      
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
            {isSuccess &&
              !!products &&
              Object.keys(products).map((product, index) => (
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

          {isSuccess &&
            !!products &&
            Object.keys(products).length > 0 &&
            Object.keys(products).length === limit && (
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
