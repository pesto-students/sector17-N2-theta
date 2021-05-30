// SLICK SLIDER
import Slider from "react-slick";
import BannerStyle from "./Style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <BannerStyle type="slider">
      <Slider {...settings}>
        <div className="slide">
          <img src="/images/banner.png" />
        </div>
        <div className="slide">
          <img src="/images/banner.png" />
        </div>
      </Slider>
    </BannerStyle>
  );
};

export default Banner;
