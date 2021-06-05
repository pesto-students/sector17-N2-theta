import Link from "next/link";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import CategoryCard from "../CategoryCard";
import CollectionsStyle from "./Style";
import useCategories from "@/data/hooks/use-categories";
import { useEffect, useState } from "react";

const FeaturedCollections = () => {
  const [dataOffset, setDataOffset] = useState(0);
  const [dataLimit, setDataLimit] = useState(2);
  const [categories, setCategories] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const { data, status, isLoading, isError } = useCategories(
    dataOffset,
    dataLimit
  );
  // console.log(data);
  useEffect(() => {
    setCategories(data);
    if (categories !== null) {
      setDataLoading(false);
    }
  }, [data, setCategories, setDataLoading]);
  return (
    <CollectionsStyle>
      <HeadingStyle>
        <h2 className="heading">
          Featured Collections
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      <Grid className="" count={2} gap={20}>
        {dataLoading
          ? ""
          : Object.keys(categories).map((category) => (
              <CategoryCard key={category} name={categories[category].name} />
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
