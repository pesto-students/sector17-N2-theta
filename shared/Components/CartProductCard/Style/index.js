import styled from 'styled-components';

const CartProductCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.color.lightGrey};

  .image-wrapper{
    width: 150px;
    background: ${props => props.theme.color.lightGrey};
  }

  .details-wrapper{
    width: calc(100% - 170px);

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.8rem;
    }

    .details {
      margin-bottom: 5px;

      .value {
        color: ${props => props.theme.color.darkGrey};
        margin-left: 5px;
      }
    }

    .price {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      align-items: baseline;

      .main-price {
        font-size: 2.4rem;
      }

      .strike-off-price {
        font-size: 2rem;
        color: ${props => props.theme.color.darkGrey};
        text-decoration: line-through;
      }

      .discount {
        font-size: 2rem;
        color: ${props => props.theme.color.green};
      }
    }
  }
`;

export default CartProductCardStyle;