import styled from 'styled-components';

const OrderStatusStyle = styled.div`
  margin-top: 30px;
  .order {
    border: 1px solid ${props => props.theme.color.darkGrey};
    flex: 3;
  }
  .summry {
    padding: 10px;
    border: 1px solid ${props => props.theme.color.darkGrey};
    margin-left: 10px;
    p {
      font-size: 2rem;
    }
  }
  .product_info {
    border-bottom: ${props => props.theme.color.darkGrey};
    flex: 3;
    .name {
      font-size: 2rem;
      font-weight: bold;
    }
    .details {
      .label {
        font-weight: bold;
      }
    }
  }
  .product_qty {
    margin: auto;
    font-weight: bold;
  }
  .product_price {
    margin: auto;
    font-weight: bold;
  }
  .product_img img {
    width: 100px;
  }
  .item {
    padding: 10px;
    border-bottom: 1px solid ${props => props.theme.color.darkGrey};
  }
  .detail {
    border: 1px solid;
    padding: 10px;
    .detail_info {
      flex: 3;
    }
  }
`;

export default OrderStatusStyle;
