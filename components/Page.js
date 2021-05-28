import React, { Component } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import Meta from "./Meta"

const theme = {
    white: "#ffffff",
    black: "#262626",
    blue2: "#8dbeff",
    maxWidth: "1440px",
    fonts: {
        lato: "'Lato', sans-serif",
        playfair: "'Playfair Display', serif"
    }
}

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 50vh;
`

createGlobalStyle`
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');

  html {
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
    font-size: 1.5rem;
    line-height: 2;
    font-family: ${theme.fonts.lato};
  }
`

class Page extends Component {
    static async getInitialProps({query}) {
      return { page: query }
    }

    render() {
        return (
          <ThemeProvider theme={theme}>
            <StyledPage>
              <Meta />
              <Header />
              <Inner>
                {React.cloneElement(this.props.children, {})}
              </Inner>
              <Footer />
            </StyledPage>
          </ThemeProvider>
        )
    }
}

export default Page;