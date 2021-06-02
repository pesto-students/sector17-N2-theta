import { useProductsWithCategory } from "@/data/hooks/use-products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";

const Catalog = () => {
  const router = useRouter();
  const [dataOffset, setDataOffset] = useState(0);
  const [dataLimit, setDataLimit] = useState(16);
  const [products, setProducts] = useState({});
  const { data, status, isLoading, isError } = useProductsWithCategory(
    router.query["category-slug"],
    dataOffset,
    dataLimit
  );
  useEffect(() => {
    if (status === "success") {
      setProducts({ ...products, ...data });
    }
  }, [status]);

  const onLoadHandler = () => {
    const offset = Object.keys(products)[Object.keys(products).length - 1];
    setDataOffset(products[offset].id);
  };

  return (
    <CatalogStyle>
      <div className="filters">Filters</div>
      <div className="products">
        <div className="heading">
          <span className="category_title">
            {router.query["category-slug"]}
          </span>
          <span className="product_count">({!!data && Object.keys(data).length})</span>
        </div>

        <div className="product_list">
          <Grid count={4} gap={12}>
            {Object.keys(products).map((product, index) => (
              <ProductCard
                key={index}
                category={products[product].category}
                slug={products[product].slug}
                title={products[product].name}
                price={products[product].price}
                image={products[product].image}
              />
            ))}
          </Grid>

          {!!data &&
            Object.keys(data).length > 0 &&
            Object.keys(data).length === dataLimit && (
              <button
                className="btn"
                disabled={isLoading}
                onClick={onLoadHandler}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            )}
        </div>
      </div>
    </CatalogStyle>
  );
};

export default Catalog;
