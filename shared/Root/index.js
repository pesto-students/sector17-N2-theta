import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import ThemeVariables from "../Constants/Variables/Theme";
import GlobalStyle from "../Styles/GlobalStyle";
import PageStyle from "../Styles/PageStyle";
import Header from "../Header";
import Footer from "../Footer";
import Meta from "../Meta";
import Error from "../Components/Error";

class Root extends Component {
  static async getInitialProps({ query }) {
    return { page: query };
  }

  render() {
    return (
      <ThemeProvider theme={ThemeVariables}>
        <PageStyle>
          <GlobalStyle />
          <Meta />
          <Error>
            <Header />
            <div className="page__inner">
              <div className="app-container">
                {React.cloneElement(this.props.children, {})}
              </div>
            </div>
            <Footer />
          </Error>
        </PageStyle>
      </ThemeProvider>
    );
  }
}

export default Root;
