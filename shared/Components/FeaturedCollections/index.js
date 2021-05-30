import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import CategoryCard from "../CategoryCard";

const FeaturedCollections = () => {
    return (
      <div className="top-trending-products">
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
      </div>
    )
}

export default FeaturedCollections;