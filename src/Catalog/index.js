import { useCategories, useProducts } from "@/data";
import Link from "next/link";
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

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(offset, limit, "sku", router.query["category-slug"]);

  const {
    data: categories = {},
    isLoading: isCatLoading,
    isSuccess: isCatSuccess,
  } = useCategories(0, 20);

  useEffect(() => {
    isSuccess && setProducts({ ...products, ...data });
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };
  
  // const filterWhere = [];
  const onFilter =(filter)=>{
    // filterWhere.push(filter)
    console.log(filterWhere);
  }
  return (
    <CatalogStyle>
      <div className="filters">
        <div className="filter_action">
          <span>Filters</span>
          <span className="filter_clear">Clear All</span>
        </div>
        <div className="filter_options">
          <div className="filter_title">Categories</div>
          <ul className="">
            {isSuccess &&
              !!categories &&
              Object.keys(categories).map((category) => (
                <li key={categories[category].id}>
                  <Link href={`/categories/${categories[category].id}`}>
                  <a>
                    <span className="label">{categories[category].name}</span>
                  </a>
                  </Link>
                </li>
              ))}
          </ul>
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
