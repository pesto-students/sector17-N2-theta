import Root from "../shared/Root";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalContextProvider } from "context/GlobalContext";
import { useState } from "react";

const MyApp = ({ Component, pageProps }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const contextData = {
    cartItemsCount,
    setCartItemsCount
  }

  return (
    <GlobalContextProvider value={contextData}>
          <QueryClientProvider client={queryClient}>
            <Root>
              <Component {...pageProps} />
            </Root>
          </QueryClientProvider>
    </GlobalContextProvider>
  )
}

export default MyApp;
