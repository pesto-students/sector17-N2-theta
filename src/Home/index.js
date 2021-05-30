import { Fragment } from "react";
import Banner from "../../shared/Components/Banner";
import USP from "../../shared/Components/USP";
import ProductsGrid from "../../shared/Components/ProductsGrid";
import CategoryGrid from "../../shared/Components/CategoryGrid";
import HeadingStyle from "../../shared/Styles/HeadingStyle";

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <USP />
      <HeadingStyle>
        <h2 className="heading">
          Top Trending Products
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      
      <ProductsGrid />
      
      <HeadingStyle>
        <h2 className="heading">
          Featured Collections
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      
      <CategoryGrid />

      <HeadingStyle>
        <h2 className="heading">
          Recently Viewed Products
          <span className="heading-underline"></span>
        </h2>
      </HeadingStyle>
      
      <ProductsGrid />
    </Fragment>
  );
};

export default Home;
