import styled, { css } from 'styled-components';

const CartWithItems = css`
  justify-content: space-between;
  gap: 20px;

  .products {
    width: calc(100% - 320px);
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;


    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 500;
      line-height: 45px;
      border-bottom: 1px solid ${props => props.theme.color.lightGrey};
      padding:0 20px;
    }

    .continue-shopping {
      text-align: right;
      padding: 0 20px;
      line-height: 45px;
      font-size: 1.6rem;
    }
  }
  .summary {
    width: 300px;
  }
`;

const EmptyCart = css`
  justify-content: center;
  flex-flow: column;
  align-items: center;
  font-size: 2rem;

  a {
    text-decoration: underline;
    font-size: 1.4rem;
  }
`;

const CartStyle = styled.div`
  display: flex;
  padding: 30px;
  ${props => props.emptyCart ? EmptyCart : CartWithItems}
`;

export default CartStyle;