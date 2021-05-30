import Grid from "../../Styles/Grid";
import HeadingStyle from "../../Styles/HeadingStyle";
import ProductCard from "../ProductCard";

const RecentlyViewed = () => {
    return (
      <div className="top-trending-products">
        <HeadingStyle>
          <h2 className="heading">
            Recently Viewed Products
            <span className="heading-underline"></span>
          </h2>
        </HeadingStyle>
        <Grid className="" count={4} gap={20}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </div>
    )
}

export default RecentlyViewed;