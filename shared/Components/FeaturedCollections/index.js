import Link from "next/link";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import CategoryCard from "../CategoryCard";
import CollectionsStyle from "./Style";
import useCategories from "../../../data/hooks/use-categories";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FeaturedCollections = () => {
  const { data: categories = {}, isLoading, isSuccess } = useCategories(0, 2);

  if (isLoading) {
    return (
      <CollectionsStyle>
        <HeadingStyle>
          <h2 className="heading">
            <Skeleton /> loadgin
          </h2>
        </HeadingStyle>
        <Grid className="" count={2} gap={20}>
          <CategoryCard />
          <CategoryCard />
        </Grid>
        <div className="view-all">
          <Skeleton height={40} width={100} />
        </div>
      </CollectionsStyle>
    );
  }
  return (
    <CollectionsStyle>
      <HeadingStyle>
        <h2 className="heading">
          Featured Collections
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      <Grid className="" count={2} gap={20}>
        {isSuccess &&
          !!categories &&
          Object.keys(categories).map((category) => (
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
