import CategoriesStyle from "./Style";
import HeadingStyle from "../../shared/Styles/HeadingStyle";
import Grid from "../../shared/Styles/Grid";
import CategoryCard from "../../shared/Components/CategoryCard";
import { useEffect, useState } from "react";
import useCategories from "@/data/hooks/use-categories";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Categories = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [categories, setCategories] = useState({});

  const {
    data,
    isLoading,
    isSuccess,
  } = useCategories(offset, limit);

  useEffect(() => {
    if(isSuccess){
      setCategories({ ...categories, ...data });
    }
  }, [data]);

  const loadMore = () => {
    const offset = Object.keys(categories)[Object.keys(categories).length - 1];
    setOffset(categories[offset].id);
  };
  if (isLoading) {
    return (
      <CategoriesStyle>
        <HeadingStyle>
          <h2 className="heading">
            <Skeleton />
          </h2>
        </HeadingStyle>
        <Grid className="" count={2} gap={20}>
          <CategoryCard />
          <CategoryCard />
        </Grid>
        <div className="view-all">
          <Skeleton height={40} width={100} />
        </div>
      </CategoriesStyle>
    );
  }

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
