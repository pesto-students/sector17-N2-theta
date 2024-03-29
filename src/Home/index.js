import dynamic from 'next/dynamic'
import HomeStyle from "./Style";
import Banner from "../../shared/Components/Banner";
import USP from "../../shared/Components/USP";
import TopTrendingProducts from "../../shared/Components/TopTrendingProducts";
import FeaturedCollections from "../../shared/Components/FeaturedCollections";

const RecentlyViewed = dynamic(() => import("../../shared/Components/RecentlyViewed"), {
  ssr: false
});

const Home = () => (
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

export default Home;
