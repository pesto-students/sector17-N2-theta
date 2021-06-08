import styled, { css } from "styled-components";

const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const NavigationStyle = styled.nav`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 30px;

  .nav_active{
    color: ${(props) => props.theme.color.primary};
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    min-height: 45px;
    ${flex};

    li {
      font-size: 1.6rem;

      a {
        ${flex};

        &:hover {
          color: ${props => props.theme.color.primary};
        }

        .icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: ${props => props.theme.color.lightGrey};
          overflow:hidden;
          img{
            width:200%;
          }
        }

        .label {
          
        }
      }
    }
  }
`;

export default NavigationStyle;
