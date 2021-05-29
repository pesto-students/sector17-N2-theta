import { useState } from "react";
import classes from "./Slider.module.css";
const DUMMYSLIDER = [
  {
    id: "s1",
    title: "Get Them Cuddle Ready!",
    subtitle: "Kids home wear Starting At ₹149",
    button: "+ EXPLORE",
    url: "",
    image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    id: "s2",
    title: "Slider Text 2",
    subtitle: "Sub Text",
    button: "+ EXPLORE",
    url: "",
    image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    id: "s3",
    title: "Slider Text 3",
    subtitle: "Sub Text",
    button: "+ EXPLORE",
    url: "",
    image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
  {
    id: "s4",
    title: "Slider Text 4",
    subtitle: "Sub Text",
    button: "+ EXPLORE",
    url: "",
    image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  },
];
const Slider = (props) => {
  const [sliderCount, setSliderCount] = useState(0);

  const onChangeHandler = (index) => {
    setSliderCount(index);
  };
  return (
    <section className={classes.banner}>
      <div className={classes.banner_group}>
        <div className={classes.banner_image}>
          <img src={DUMMYSLIDER[sliderCount].image} />
        </div>
        <div className={classes.banner_text}>
          <div className="title_tag">{DUMMYSLIDER[sliderCount].title}</div>
          <div className="sub_tag">{DUMMYSLIDER[sliderCount].subtitle}</div>
          <button>{DUMMYSLIDER[sliderCount].button}</button>
        </div>
      </div>
      <div className="slider_nav">
        <ul>
          {DUMMYSLIDER.map((slider, i) => (
            <li key={i} className={ i === sliderCount ? classes.slider_active : classes.navdot} onClick={onChangeHandler.bind(this, i)}  >{i}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Slider;
