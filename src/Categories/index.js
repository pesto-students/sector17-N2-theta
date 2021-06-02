import CategoriesStyle from "./Style";
import HeadingStyle from "../../shared/Styles/HeadingStyle";
import Grid from "../../shared/Styles/Grid";
import CategoryCard from "../../shared/Components/CategoryCard";
import { useEffect, useState } from "react";
import useCategories from "@/data/hooks/use-categories";

const Categories = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const {
    data: categories = { ...categories },
    isLoading,
    isSuccess,
  } = useCategories(offset, limit);

  const loadMore = () => {
    const offset = Object.keys(categories)[Object.keys(categories).length - 1];
    setOffset(categories[offset].id);
  };

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
          {Object.keys(categories).map((category) => (
            <CategoryCard
              key={category}
              id={categories[category].id}
              name={categories[category].name}
              image={categories[category].image}
            />
          ))}
        </Grid>
        {isSuccess &&
          !!categories &&
          Object.keys(categories).length > 0 &&
          Object.keys(categories).length === limit && (
            <button className="btn" disabled={isLoading} onClick={loadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
      </div>
    </CategoriesStyle>
  );
};

export default Categories;
