// SLICK SLIDER
import Slider from "react-slick";
import BannerStyle from "./Style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSlider from "@/data/hooks/use-slider";

const Banner = () => {
  const { data, isError, isLoading, isSuccess } = useSlider();
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
        {!!data &&
          Object.keys(data).map((slide,index) => (
            <div className="slide" key={index}>
              <img src={data[slide].image} />
            </div>
          ))}
      </Slider>
    </BannerStyle>
  );
};

export default Banner;
