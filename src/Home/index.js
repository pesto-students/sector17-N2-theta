import HomeStyle from "./Style";
import Banner from "../../shared/Components/Banner";
import USP from "../../shared/Components/USP";
import CategoryGrid from "../../shared/Components/CategoryGrid";
import HeadingStyle from "../../shared/Styles/HeadingStyle";
import TopTrendingProducts from "../../shared/Components/TopTrendingProducts";
import RecentlyViewed from "../../shared/Components/RecentlyViewed";
import FeaturedCollections from "../../shared/Components/FeaturedCollections";

const Home = () => {
  return (
    <HomeStyle>
      <Banner />

      <div className="home__inner">
        <USP />
        <TopTrendingProducts />
        <FeaturedCollections />
        <RecentlyViewed />
      </div>
    </HomeStyle>
  );
};

export default Home;
