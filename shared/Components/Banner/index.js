// SLICK SLIDER
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSlider from "../../../data/hooks/use-slider";
import BannerStyle from "./Style";

const Banner = () => {
  const { data, isLoading } = useSlider();
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (isLoading) {
    return (
      <BannerStyle type="slider" role="loading">
        <Slider {...settings}>
          <Skeleton height={250} />
        </Slider>
      </BannerStyle>
    );
  }

  return (
    <BannerStyle type="slider">
      <Slider {...settings}>
        {!!data &&
          Object.keys(data).map((slide, index) => (
            <div className="slide" key={index}  role="banner">
              <img src={data[slide].image} alt={`banner ${index}`} />
            </div>
          ))}
      </Slider>
    </BannerStyle>
  );
};

export default Banner;
