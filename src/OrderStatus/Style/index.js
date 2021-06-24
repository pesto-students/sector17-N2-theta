import styled from 'styled-components';

const OrderStatusStyle = styled.div`
  margin-top: 30px;
  .orders-row {
    flex-wrap: wrap;
    flex: initial;
  }
  .title{
    text-align: center;
    text-transform: uppercase;
  }
  .success {
    color: ${props => props.theme.color.green};
  }
  .subtitle {
    text-align: center;
  }
  div {
    flex: 1;
  }
  .final_message {
    padding: 10px;
    .message {
      font-size: 2rem;
      font-weight: bold;
    }
    .continue_shop {
      text-align: right;
      margin:auto;
      a {
        color: ${props => props.theme.color.primary};
      }
    }
  }
  h3 {
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px;
    &:last-child {
      text-align: right;
    }
  }
  .order {
    border: 1px solid #ddd;
    flex: initial;
    margin-bottom: 15px;
    width: 100%;
    h1 {
      padding-left: 20px;
      a {
        color: ${props => props.theme.color.primary};
      }
    }
    @media screen and (min-width: 768px) {
      width: calc(100% - (250px + 15px)) !important;
    }
    @media screen and (min-width: 992px) {
      width: calc(100% - (280px + 15px)) !important;
    }
  }
  .summry {
    flex: initial;
    padding: 10px;
    border: 1px solid #ddd;
    margin-left: auto;
    margin-bottom: 15px;
    width: 100%;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
    @media screen and (min-width: 992px) {
      width: 280px;
    }
    p {
      font-size: 1.2em;
      margin: 0;
      border-bottom: 1px solid #ddd;
      padding: 8px 0;
      display: flex;
      @media screen and (max-width: 767px) {
        line-height: normal;
      }
      strong {
        padding-right: 5px;
      }
      span {
        margin-left: auto;
      }
      &:last-child {
        font-size: 1.4em;
        border-bottom: none;
      }
    }
    h2 {
      line-height: normal;
      margin: 0 0 15px 0;
      font-size: 1.8em;
    }
  }
  .product_info {
    border-bottom: ${props => props.theme.color.darkGrey};
    flex: 3;
    padding-left: 10px;
    padding-right: 5px;
    @media screen and (min-width: 768px) {
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 5px;
    }
    .name {
      font-size: 2rem;
      font-weight: bold;
      line-height: normal;
      margin-bottom: 10px;
    }
    .details {
      .label {
        font-weight: bold;
      }
      > div {
        line-height: normal;
        margin-bottom: 5px;
      }
    }
  }
  .product_qty {
    margin: auto;
    font-weight: bold;
    padding-right: 10px;
    padding-left: 10px;
    @media screen and (min-width: 768px) {
      padding-right: 15px;
      padding-left: 15px;
    }
  }
  .product_price {
    margin: auto;
    font-weight: bold;
  }
  .product_img {
    flex: initial !important;
    width: 30px;
    margin-top: 6px;
    @media screen and (min-width: 768px) {
      width: 100px;
      margin-top: 0px;
    }
  }
  .product_img img {
    max-width: 100%;
    min-width: 100%;
  }
  .item {
    padding: 10px;
    // border-bottom: 1px solid ${props => props.theme.color.darkGrey};
    &:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
  }
  .detail {
    border: 1px solid;
    padding: 10px;
    .detail_info {
      flex: 3;
    }
  }

  .address {
    margin-bottom: 15px;
    font-size: 15px;
  }
`;

export default OrderStatusStyle;
