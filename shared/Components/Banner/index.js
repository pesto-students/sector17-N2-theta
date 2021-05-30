// SLICK SLIDER
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerStyle from "./Style";


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
        <div>
          <img src="/images/banner.png" />
        </div>
      </Slider>
    </BannerStyle>
  );
};

export default Banner;
