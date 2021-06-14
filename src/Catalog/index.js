import { useProducts } from "@/data";
import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Filter from "shared/Components/Filter";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";
const Catalog = () => {
  const router = useRouter();
  const currentPage = router.query["category-slug"];
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [products, setProducts] = useState({});

  const { data: category = {}, isLoading: categoryLoading } =
    useSingleCategory(currentPage);

  // Filter Pramas
  const [clear, setClear] = useState(false);

  const [manufacturer, setManufacturer] = useState([]);
  const [price, setPrice] = useState([]);

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useProducts(offset, limit, "sku", currentPage, manufacturer, price);

  useEffect(() => {
    setProducts({});
    const identifier = setTimeout(() => {
      if (manufacturer.length > 0 || price != "") {
        router.push(
          `/categories/${currentPage}?price=${price}&manufacturer=${manufacturer}`
        );
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [currentPage, manufacturer, price, clear]);

  useEffect(() => {
    isSuccess && setProducts({ ...products, ...data });
  }, [data]);

  const loadMore = () => {
    const productKeys = Object.keys(data);
    const offset = productKeys[productKeys.length - 1];
    setOffset(parseInt(offset));
  };

  const onFilter = (filter) => {
    if (manufacturer.length > 0) {
      const preventDuplicate = manufacturer.find((item) => item === filter);
      const index = manufacturer.indexOf(filter);
      if (index > -1) {
        manufacturer.splice(index, 1);
        setManufacturer([...manufacturer]);
      } else {
        setManufacturer([...manufacturer, filter]);
      }
    } else {
      setManufacturer([...manufacturer, filter]);
    }
    setClear(true);
  };

  const onPriceChange = (min, max) => {
    setPrice([min, max]);
    setClear(true);
  };

  const onClearHandeler = () => {
    setManufacturer([]);
    setPrice([]);
    setClear(false);
    router.push(`/categories/${currentPage}`);
  };
  if (isLoading) {
    return (
      <CatalogStyle>
        <div className="filters">
          <div className="filter_options">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
        <div className="products">
          <div className="heading">
            <span className="category_title">
              <Skeleton />
            </span>
          </div>

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
      </CatalogStyle>
    );
  }
  return (
    <CatalogStyle>
      <div className="filters">
        {!categoryLoading && (
          <Filter
            products={products}
            onFilter={onFilter}
            price={price}
            onPriceChange={onPriceChange}
            onClearHandeler={onClearHandeler}
            category={category}
            activeList={manufacturer}
            clear={clear}
          />
        )}
      </div>
      <div className="products">
        <div className="heading">
          <span className="category_title">
            {!categoryLoading && category.name}
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
    </CatalogStyle>
  );
};

export default Catalog;
