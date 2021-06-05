import dynamic from 'next/dynamic'

import HomeStyle from "./Style";
import Banner from "../../shared/Components/Banner";
import USP from "../../shared/Components/USP";
import TopTrendingProducts from "../../shared/Components/TopTrendingProducts";
import FeaturedCollections from "../../shared/Components/FeaturedCollections";
import  useProducts  from "@/data/hooks/use-products";

const RecentlyViewed = dynamic(() => import("../../shared/Components/RecentlyViewed"), {
  ssr: false
});

const Home = () => {
  const {data, status, isLoading, isError} = useProducts();
  return (
    <HomeStyle>
      <Banner />
      <div className="home__inner">
        <USP />
        {isError && <h1>{isError} </h1>}
        {!isLoading && <TopTrendingProducts products={data} />}
        <FeaturedCollections />
        <RecentlyViewed />
      </div>
    </HomeStyle>
  );
};

export default Home;
