import App from "next/app";
import Root from "../shared/Root";
import { QueryClient, QueryClientProvider } from "react-query";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      pageProps.query = ctx.query;
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <Root>
          <Component {...pageProps} />
        </Root>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
