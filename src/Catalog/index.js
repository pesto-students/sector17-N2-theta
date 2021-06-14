import { useProducts } from "@/data";
import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Filter from "shared/Components/Filter";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";
import CatalogProducts from "../../shared/Components/CatalogProducts";
const Catalog = () => {
  const router = useRouter();
  const currentPage = router.query["category-slug"];
  const [price, setPrice] = useState([20, 100000]);
  const [manufacturer, setManufacturer] = useState([]);
  const [clear, setClear] = useState(false);

  const { data: category = {}, isLoading } = useSingleCategory(currentPage);

  useEffect(() => {
    setManufacturer([]);
    setPrice([20, 100000]);
  }, [currentPage]);

  useEffect(()=>{
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
  },[manufacturer,price]);

  
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
    setPrice([20, 100000]);
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
        {!isLoading && (
          <Filter
            onFilter={onFilter}
            price={price}
            onPriceChange={onPriceChange}
            onClearHandeler={onClearHandeler}
            category={category}
            activeList={manufacturer}
            clear={clear}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="products">
        <CatalogProducts
          singleCategory={category}
          categoryLoading={isLoading}
          price={price}
        />
      </div>
    </CatalogStyle>
  );
};

export default Catalog;
