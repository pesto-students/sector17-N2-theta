import { useSingleCategory } from "@/data/hooks/use-categories";
import { useRouter } from "next/router";

import Filter from "shared/Components/Filter";
import CatalogStyle from "./Style";
import CatalogProducts from "../../shared/Components/CatalogProducts";
const Catalog = () => {
  const router = useRouter();
  const currentPage = router.query["category-slug"];

  const { data: category = {}, isLoading } = useSingleCategory(currentPage);

  return (
    <CatalogStyle>
      <div className="filters">
        <Filter />
      </div>
      <div className="products">
        <CatalogProducts singleCategory={category} />
      </div>
    </CatalogStyle>
  );
};

export default Catalog;
