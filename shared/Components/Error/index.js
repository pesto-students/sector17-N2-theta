import { Component } from "react";
import ErrorStyle from "./Style";
class Error extends Component {
  constructor() {
    super();
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorStyle>
          <div className="backdrop" />
          <div className="error-modal">
            <h2> OOPS Something went wrong please try again...</h2>
            <p>
              <details>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            </p>
            <div className="error-modal__actions">
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </ErrorStyle>
      );
    }

    return this.props.children;
  }
}

export default Error;
