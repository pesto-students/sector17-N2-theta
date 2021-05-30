import styled from "styled-components";

const ProductCardStyle = styled.div`
  background-color: #fff;
  flex-basis: 24%;
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
  border: 1px solid #f5f5f6;
  .product_item {
    cursor: pointer;
    .row_group {
      display: flex;
      border-top: 1px solid #f5f5f6;
      padding: 10px 0px;
      div {
        flex: 1;
      }
      .addtocart {
        text-align: right;
        button {
          background: #fe5351;
          color: #fff;
          border: 0;
          padding: 5px 18px;
          font-size: 2rem;
          cursor: pointer;
        }
        .text {
          display: none;
        }
        .plus {
          display: block;
        }
      }
    }

    &:hover .addtocart {
      .plus {
        display: none;
      }
      .text {
        display: block;
        font-size: 2rem;
        transition-duration: 4s;
        transition-delay: 2s;
      }
    }
    img {
      width: 100%;
    }
    .soldby {
      color: #999999;
      font-size: 1rem;
      display: block;
      line-height: 0;
      margin-top: 2rem;
    }
    .product_title {
      font-size: 2rem;
    }
    .product_price {
      font-size: 2rem;
      font-weight: 600;
    }
    .product_price span {
      text-decoration: line-through;
      color: #8a8a8a;
      font-size: 1rem;
    }
    .stars {
      .checked {
        color: orange;
      }
      span {
        margin-right: 0.5rem;
      }
    }
  }
`;

export default ProductCardStyle;
