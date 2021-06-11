import styled from 'styled-components';

const CartProductCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.color.lightGrey};

  .image-wrapper{
    width: 100px;

    @media screen and (min-width: 768px) {
      width: 150px;
    }

    img {
      width: 100%;
      display: block;
    }
  }

  .details-wrapper{
    width: calc(100% - 100px);
    padding-left: 15px;
    @media screen and (min-width: 768px) {
      width: calc(100% - 150px);
    }

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

    .actions {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
      font-size: 1.6rem;

      button {
        border: none;
        background: none;
        font-size: inherit;
        cursor: pointer;
        padding: 0;

        &:hover{
          color: ${props => props.theme.color.primary}
        }
      }
    }
  }
`;

export default CartProductCardStyle;