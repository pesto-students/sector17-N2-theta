import App from "next/app"
import Root from "../shared/Root"

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
          pageProps.query = ctx.query
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Root>
                <Component {...pageProps} />
            </Root>
        )
    }
}

export default MyApp