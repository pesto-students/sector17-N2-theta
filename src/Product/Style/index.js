import styled from "styled-components";

const ProductDetailStyle = styled.div`
  .breadcrumbs {
    list-style: none;
    margin: 10px 0px;
    li {
      display: inline;
      &:after {
        content: "/";
        padding: 0 5px;
      }
      &:last-child {
        &:after {
          content: "";
        }
      }
    }
  }
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
    .product_full {
      border: 1px solid rgb(245, 245, 245);
      transition: all 0.2s ease-in-out 0s;
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

    .price {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      gap: 10px;
      min-width: 50%;

      .main-price {
        font-size: 2.6rem;
        font-weight: 600;
        color: ${(props) => props.theme.color.black};
      }

      .stike-through {
        font-size: 1.6rem;
        color: ${(props) => props.theme.color.darkGrey};
        text-decoration: line-through;
      }
    }
    .qty {
      margin-top: 2rem;
      ul {
        display: flex;
        li {
          flex: 1;
          background: none;
          font-weight: bold;
          button {
            padding: 7px 20px;
            border: 1px;
            background: ${(props) => props.theme.color.darkGrey};
          }
          span {
            padding: 6px 20px;
            position: relative;
            top: 1.4px;
            border: 1px solid ${(props) => props.theme.color.darkGrey};
          }
        }
      }
    }

    .add-to-cart {
      width: 250px;
      min-height: 40px;
      font-size: 2.2rem;
      color: ${(props) => props.theme.color.white};
      background: ${(props) => props.theme.color.primary};
      transition: all ease-in-out 0.2s;
      cursor: pointer;
      border: none;
      margin: 35px 0px;
    }

    .extra_option {
      span{
        font-size: 1rem;
      }
      label {
        font-weight: bold;
        clear: both;
        display: block;
      }
      .pincode_input {
        position: relative;
        input {
          background: ${(props) => props.theme.color.white};
          border: 1px solid ${(props) => props.theme.color.grey};
          border-radius: 5px;
          padding: 0 15px;
          min-width: 350px;
          min-height: 40px;
        }
        button {
          color:${(props) => props.theme.color.darkGrey};
          background: none;
          border: 0px;
          position: relative;
          left: -7rem;
          cursor: pointer;
        }
      }
    }
  }
  .description {
    background: ${(props) => props.theme.color.lightGrey};
    padding: 30px;
    text-align: center;
    div {
      display: flex;
      table {
        flex: 1;
        margin: 15px 0px;
        tr {
          border-bottom: 1px solid ${(props) => props.theme.color.grey};
          display: table;
          width: 97%;
        }
        th {
          text-align: left;
        }
        td {
          text-align: right;
          color: ${(props) => props.theme.color.darkGrey};
        }
      }
    }
  }
`;

export default ProductDetailStyle;
