import Link from "next/link";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import CategoryCard from "../CategoryCard";
import CollectionsStyle from "./Style";
import useCategories from "@/data/hooks/use-categories";
import { useEffect, useState } from "react";

const FeaturedCollections = () => {
  const [dataLimit, setDataLimit] = useState(2);
  const [categories, setCategories] = useState({});
  const { data, status, isLoading, isError } = useCategories(
    0,
    dataLimit
  );
  useEffect(() => {
    if (status === "success") {
      setCategories({ ...categories, ...data });
    }
  }, [status]);

  return (
    <CollectionsStyle>
      <HeadingStyle>
        <h2 className="heading">
          Featured Collections
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      <Grid className="" count={2} gap={20}>
        {!isError && Object.keys(categories).map((category) => (
              <CategoryCard
                key={category}
                id={categories[category].id}
                name={categories[category].name}
                image={categories[category].image}
              />
            ))}
      </Grid>
      <div className="view-all">
        <Link href="/categories" as="/categories">
          <a>View All Categories</a>
        </Link>
      </div>
    </CollectionsStyle>
  );
};

export default FeaturedCollections;
