import { useProducts } from "@/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";

const Catalog = () => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const limit = 16;

  const [products, setProducts] = useState({});

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(offset, limit, "sku", router.query["category-slug"]);

  useEffect(() => {
    isSuccess && setProducts({ ...products, ...data });
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };

  return (
    <CatalogStyle>
      <div className="filters">Filters</div>
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
