import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');

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
    background: ${(props) => props.theme.color.black};
    color: ${(props) => props.theme.color.white};
    border: 0;
    padding: 10px 20px;
    display: block;
    margin: 15px auto;
    font-size: 1.4rem;
    cursor: pointer;
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
