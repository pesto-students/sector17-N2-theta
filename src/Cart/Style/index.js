import styled, { css } from 'styled-components';

const CartWithItems = css`
  justify-content: space-between;
  flex-wrap: wrap;

  .products {
    width: 100%;
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;

    @media screen and (min-width: 768px) {
      width: calc(100% - 230px);
    }

    @media screen and (min-width: 992px) {
      width: calc(100% - 300px);
    }


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
    width: 100%;
    @media screen and (max-width: 767px) {
      padding-top: 15px;
    }
    @media screen and (min-width: 768px) {
      width: 230px;
      padding-left: 15px;
    }
    @media screen and (min-width: 992px) {
      width: 300px;
    }
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
  padding: 30px 0 0;
  ${props => props.emptyCart ? EmptyCart : CartWithItems}
`;

export default CartStyle;