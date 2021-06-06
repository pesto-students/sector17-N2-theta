import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import ThemeVariables from "../Constants/Variables/Theme";
import GlobalStyle from '../Styles/GlobalStyle';
import PageStyle from "../Styles/PageStyle";
import Header from "../Header";
import Footer from "../Footer";
import Meta from "../Meta";


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
          <Header />
          <div className='page__inner'>
            {React.cloneElement(this.props.children, {})}
          </div>
          <Footer />
        </PageStyle>
      </ThemeProvider>
    );
  }
}

export default Root;
