import styled from 'styled-components';

const ShippingMethodsStyle = styled.div`
  margin-top: 20px;
  border: 1px solid #dedede;

  .heading {
    border-bottom: ${props => props.enabled ? '1px solid #dedede' : 'none'};
    padding: 10px 30px;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .shipping-inner {
    padding: 0 30px 20px;

    .shipping-type {
      font-size: 1.6rem;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .products {
      display: grid;
      grid-template-columns: calc(25% - 15px) calc(25% - 15px) calc(25% - 15px) calc(25% - 15px);
      grid-gap: 20px;

      .product {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px 10px;
        border: 1px solid ${props => props.theme.color.grey};
        border-radius: 4px;

        img{
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .detail{
          width: calc(100% - 50px);

          .name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
        }
      } 
    }
  }
`;

export default ShippingMethodsStyle;