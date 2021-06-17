import { useRouter } from "next/router";
import { useEffect, useState , useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import { useProducts } from "../../../data";
import ProductCard from "../ProductCard";
import Grid from "../../Styles/Grid";

const CatalogProducts = (props) => {
  const router = useRouter();
  const { categoryLoading, singleCategory } = props;
  const [offset, setOffset] = useState(0);
  const limit = useState(16);
  const [products, setProducts] = useState({});

  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const currentPage = router.query["category-slug"];

  const { globalManufacturerFilter, globalPriceFilter } =
    useContext(GlobalContext);

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(
    offset,
    limit,
    "sku",
    currentPage,
    globalManufacturerFilter,
    globalPriceFilter
  );

  useEffect(() => {
    if(!isLoading){
      setProducts({ ...data })
    }

    if (router.query.price && router.query.price !== "") {
      setPriceFilter(router.query.price.split(","));
    }
    if (router.query.manufacturer && router.query.manufacturer !== "") {
      setManufacturerFilter(router.query.manufacturer.split(","));
    }

  }, [data, globalManufacturerFilter, isLoading, router.query]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const newOffset = parseInt(productKeys[productKeys.length - 1], 10);
    setOffset(newOffset);
  };

  if (isLoading) {
    return (
      <div>
        <div className="heading" />

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
          {!categoryLoading && singleCategory.name}
        </span>
        <span className="product_count">
          ({isSuccess && !!products && Object.keys(products).length})
        </span>
      </div>

      <div className="product_list">
        <Grid count={4} gap={15}>
          {!!products &&
            Object.keys(products).map((product) => (
              <ProductCard key={product} id={product} {...products[product]} />
            ))}
        </Grid>

        {!!products &&
          ((Object.keys(data).length > 0 &&
            Object.keys(data).length === limit) ||
            isLoading) && (
            <button type="button" className="btn" disabled={isLoading} onClick={loadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
      </div>
    </div>
  );
};
export default CatalogProducts;
