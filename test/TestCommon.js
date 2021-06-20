import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { GlobalContextProvider } from "../context/GlobalContext";

import { ThemeProvider } from "styled-components";
import ThemeVariables from "../shared/Constants/Variables/Theme";
import GlobalStyle from "../shared/Styles/GlobalStyle";
import PageStyle from "../shared/Styles/PageStyle";

const contextData = {};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function testCommon(props) {
  return (
    <GlobalContextProvider value={contextData}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={ThemeVariables}>
          <PageStyle>
            <GlobalStyle />
            {props.children}
          </PageStyle>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalContextProvider>
  );
};
