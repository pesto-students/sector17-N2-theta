import styled from "styled-components";

const ProductDetailStyle = styled.div`
  .product_gallery {
    display: flex;
    img {
      width: 100%;
    }
    .product_thumbnail {
      ul li {
        background: ${(props) => props.theme.color.grey};
      }
      ul li img {
        max-width: 60px;
      }
    }
  }
  .product_info {
    .product_title {
      color: ${(props) => props.theme.color.black};
      font-size: 1.6rem;
      margin-top: -5px;
    }

    .review {
      color: ${(props) => props.theme.color.yellow};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 2px;
      line-height: 20px;
      margin-bottom: 10px;

      .fa {
        font-size: 1.6rem;
      }

      .count {
        color: ${(props) => props.theme.color.darkGrey};
        margin-left: 5px;
      }
    }
  }
`;

export default ProductDetailStyle;
