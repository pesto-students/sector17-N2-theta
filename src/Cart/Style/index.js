import styled, { css } from 'styled-components';

const heading = css`
  margin: 0;
  font-size: 2rem;
  font-weight: 500;
  line-height: 45px;
  border-bottom: 1px solid ${props => props.theme.color.lightGrey};
  padding:0 20px;
`;

const CartWithItems = css`
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  .products {
    width: 100%;
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;

    @media screen and (min-width: 768px) {
      width: calc(100% - 250px);
    }

    @media screen and (min-width: 992px) {
      width: calc(100% - 320px);
    }


    h1 {
      ${heading}
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
    border: 1px solid ${props => props.theme.color.lightGrey};
    border-radius: 3px;

    .summary-inner {
      position: sticky;
      top: 140px;

      .details-heading {
        ${heading}
      }

      .details {
        padding:0 20px;

        li {
          line-height: 40px;
          display: flex;
          justify-content: space-between;

          &.coupon-discount, &.delivery-charge {
            .value, .green {
              color: ${props => props.theme.color.green};
            }
          }

          &.total {
            border-top: 1px solid ${props => props.theme.color.lightGrey};
            font-weight: 600;
          }

          &.button{
            padding-top: 10px;
            padding-bottom: 20px;

            a, button {
              display: block;
              width: 100%;
              background: ${props => props.theme.color.primary};
              text-align: center;
              border-radius: 3px;
              color: ${props => props.theme.color.white};
              font-size: 1.6rem;
              letter-spacing: 1px;
              line-height: 40px;
            }
          }

          button {
            color: ${props => props.theme.color.primary};
            white-space: nowrap;
            border: none;
            background: none;
            cursor: pointer;
          }

          .form {
            width: 100%;

            .fields{
              display: flex;
              justify-content: space-between;
              gap: 10px;

              input[type="text"]{
                width: 100%;
                height: 40px;
                border: none;
                border-bottom: 1px solid ${props => props.theme.color.grey};

                &:focus{
                  border-bottom: 1px solid ${props => props.theme.color.black};
                }
              }
              button {
                padding: 0;
                height: 40px;

                &:disabled{
                  color: ${props => props.theme.color.darkGrey};
                  pointer-events: none;
                }
              }
            }

            .error {
              line-height: 25px;
              color: #ff0000;
              font-size: 1.2rem;
            }

          }
        }
      }
    }


    @media screen and (max-width: 767px) {
      padding-top: 15px;
    }
    @media screen and (min-width: 768px) {
      width: 230px;
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