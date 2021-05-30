import { createGlobalStyle } from 'styled-components'

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
    font-family: ${props => props.theme.fonts.lato};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.color.black};
    cursor: pointer;
  }
`

export default GlobalStyle;