import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";

import Filter from "shared/Components/Filter";
import CatalogStyle from "./Style";
import CatalogProducts from "../../shared/Components/CatalogProducts";

import GlobalContext from "context/GlobalContext";
import { useContext } from "react";
const Catalog = () => {
  const router = useRouter();
  const currentPage = router.query["category-slug"];

  const { data: category = {}, isLoading } = useSingleCategory(currentPage);

  const {
    setGlobalManufacturerFilter,
    setGlobalPriceFilter,
    clearFilter,
    setClearFilter,
  } = useContext(GlobalContext);

  const onClearHandeler = () => {
    setClearFilter(false);
    setGlobalManufacturerFilter([]);
    setGlobalPriceFilter([]);
    router.push(`/categories/${router.query["category-slug"]}`);
  };
  return (
    <CatalogStyle>
      <div className="filters">
        <Filter onClearHandeler={onClearHandeler} />
      </div>
      <div className="products">
        <CatalogProducts singleCategory={category} />
      </div>
    </CatalogStyle>
  );
};

export default Catalog;
