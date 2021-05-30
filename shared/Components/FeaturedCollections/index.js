import Link from "next/link";
import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import CategoryCard from "../CategoryCard";
import CollectionsStyle from "./Style";

const FeaturedCollections = () => {
    return (
      <CollectionsStyle>
        <HeadingStyle>
          <h2 className="heading">
            Featured Collections
            <span className="heading-underline"></span>
          </h2>
        </HeadingStyle>
        <Grid className="" count={2} gap={20}>
          <CategoryCard />
          <CategoryCard />
        </Grid>
        <div className="view-all">
          <Link href="/categories" as="/categories">
            <a>
              View All Categories
            </a>
          </Link>
        </div>
      </CollectionsStyle>
    )
}

export default FeaturedCollections;