import CategoriesStyle from "./Style";
import HeadingStyle from "../../shared/Styles/HeadingStyle";
import Grid from "../../shared/Styles/Grid";
import CategoryCard from "../../shared/Components/CategoryCard";

const Categories = () => {
  return (
    <CategoriesStyle>
      <div className="categories__inner">
        <HeadingStyle>
          <h2 className="heading">
            All Categories
            <span className="heading-underline"></span>
          </h2>
        </HeadingStyle>
        <Grid className="" count={2} gap={20}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </Grid>
      </div>
    </CategoriesStyle>
  );
};

export default Categories;