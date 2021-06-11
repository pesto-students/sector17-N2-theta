import styled from 'styled-components';

const FooterStyle = styled.footer`
  width: 100%;
  background: ${props => props.theme.color.lightGrey};
  margin-top: 60px;

  .footer__inner {
    // max-width: ${props => props.theme.maxWidth};
    // padding: 40px 40px 0 40px;
    padding: 40px 0;

    .footer__blocks {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0;
      padding-bottom: 30px;
      border-bottom: 1px solid ${props => props.theme.color.grey};

      @media screen and (min-width: 768px) {
        gap: 160px;
      }
      &:last-child {
        padding-bottom: 0;
      }
      

      &+.footer__blocks {
        padding-top: 30px;
        border: none;

        a {
          text-decoration: underline;
        }
      }

      .footer__link-blocks {
        display: flex;
        justify-content: flex-start;
        gap: 100px;

        @media screen and (min-width: 768px) {
          gap: 160px;
        }

        .footer__link-block {
          
          .heading {
            font-size: 1.6rem;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              a {
                font-weight: 300;
              }
            }
          }
        }
      }
    }
  }
`;

export default FooterStyle;