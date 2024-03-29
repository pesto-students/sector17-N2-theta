import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    outline: none;
  }

  *{
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    line-height: 2;
    font-family: ${(props) => props.theme.fonts.lato};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.black};
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.color.primary};
    }
  }

  .active{
    color: ${(props) => props.theme.color.primary};
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .btn{
    background: ${props => props.theme.color.primary};
    color: ${(props) => props.theme.color.white};
    border: 0;
    padding: 10px 20px;
    display: block;
    margin: 15px auto;
    cursor: pointer;
    border-radius: 3px;
    min-width: 200px;
    font-size: 1.6rem;
  }

  .row_group{
    display:flex;
    div{flex:1}
  }
  .app-container,
  .app-container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }
  @media screen and (min-width: 992px) {
    .app-container,
    .app-container-fluid {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  @media screen and (min-width: 1400px) {
    .app-container {
      max-width: ${(props) => props.theme.maxWidth};
      margin-right: auto;
      margin-left: auto;
    }
  }

  /* form input */
  .app-form-input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]),
  .app-form-input input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]) {
    height: 40px;
    box-sizing: border-box;
  }

  .app-form-input [type="submit"] {
    min-height: 40px;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
