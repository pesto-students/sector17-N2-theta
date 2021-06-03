import styled from "styled-components";

const ProductCardStyle = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.color.lightGrey};
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  }

  .product_item {
    .image_wrapper {
      max-height: 250px;

      img {
        width: 100%;
        height: 250px;
        object-fit: contain;
      }
    }

    .product_caption {
      padding: 0 10px;

      .soldby {
        font-size: 1.2rem;
        color: ${(props) => props.theme.color.darkGrey};
      }

      .product_title {
        color: ${(props) => props.theme.color.black};
        font-size: 1.6rem;
        margin-top: -5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
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

      .row_group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 40px;
        margin: 0 -10px;
        padding-left: 10px;
        border-top: 1px solid ${(props) => props.theme.color.lightGrey};

        .price {
          display: flex;
          justify-content: flex-start;
          align-items: baseline;
          gap: 10px;
          min-width: 50%;

          .main-price {
            font-size: 1.6rem;
            font-weight: 600;
            color: ${(props) => props.theme.color.black};
          }

          .stike-through {
            font-size: 1.2rem;
            color: ${(props) => props.theme.color.darkGrey};
            text-decoration: line-through;
          }
        }

        .add-to-cart-placeholder {
          width: 100%;
          min-height: 40px;
        }
      }
    }
  }

  .add-to-cart {
    width: 40px;
    min-height: 40px;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1.6rem;
    color: ${(props) => props.theme.color.white};
    background: ${(props) => props.theme.color.primary};
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    border: none;

    .text {
      font-size: 0;
      transition: all ease-in-out 0.2s;
    }

    .plus {
      transition: all ease-in-out 0.2s;
    }
  }

  &:hover {
    .add-to-cart {
      width: 50%;

      .text {
        font-size: 1.6rem;
      }

      .plus {
        font-size: 0;
      }
    }
  }
`;

export default ProductCardStyle;
