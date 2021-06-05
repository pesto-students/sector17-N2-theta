import { useRouter } from "next/router";
import ProductCard from "../../shared/Components/ProductCard";
import Grid from "../../shared/Styles/Grid";
import CatalogStyle from "./Style";

const Catalog = () => {
  const router = useRouter();

  return (
    <CatalogStyle>
      <div className="filters">
        Filters
      </div>
      <div className="products">
        <div className="heading">
          <span className="category_title">
            {router.query['category-slug']}
          </span>
          <span className="product_count">(450)</span>
        </div>

        <div className="product_list">
          <Grid count={4} gap={12}>
            <ProductCard />
            <ProductCard />
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
  )
}

export default Catalog;