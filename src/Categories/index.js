import CategoriesStyle from "./Style";
import HeadingStyle from "../../shared/Styles/HeadingStyle";
import Grid from "../../shared/Styles/Grid";
import CategoryCard from "../../shared/Components/CategoryCard";
import { useEffect, useState } from "react";
import useCategories from "@/data/hooks/use-categories";

const Categories = () => {
  const [dataOffset, setDataOffset] = useState(0);
  const [dataLimit, setDataLimit] = useState(10);
  const [categories, setCategories] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const { data, status, isLoading, isError } = useCategories(
    dataOffset,
    dataLimit
  );
  useEffect(() => {
    console.log("Render Category");
    if (status === "success") {
      setCategories({ ...categories, ...data });
      setDataLoading(false);
    }
  }, [status]);

  const onLoadHandler = () => {
    const offset = Object.keys(categories)[Object.keys(categories).length - 1];
    setDataOffset(categories[offset].id);
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
        {!!data && Object.keys(data).length > 0 && Object.keys(data).length === dataLimit && <button className="btn" disabled={isLoading} onClick={onLoadHandler}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>}
      </div>
    </CategoriesStyle>
  );
};

export default Categories;
