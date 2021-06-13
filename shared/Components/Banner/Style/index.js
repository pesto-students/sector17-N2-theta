import styled from "styled-components";

const BannerStyle = styled.div`
  margin-top: 20px;
  .slide {
    img {
      width: 100%;
    }
  }
  button.slick-arrow {
    display: none !important;
  }
  .slick-dots {
    position: relative;
    bottom: 0;
  }

  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: ${(props) => props.theme.color.primary};
  }
  .slick-prev:before,
  .slick-next:before {
    color: ${(props) => props.theme.color.black}!important;
  }
`;

export default BannerStyle;
