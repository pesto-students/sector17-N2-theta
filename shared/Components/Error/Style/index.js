import styled from "styled-components";

const ErrorStyle = styled.div`
 
  .error-modal {
    position: absolute;
    top: 15vh;
    left: calc(50% - 50rem);
    width: 100rem;
    background: ${props=>props.theme.color.white};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 100;
    border-radius: 7px;
  }

  .error-modal h2 {
    margin: 0;
    padding: 1rem;
    background:${props=>props.theme.color.primary};
    color: white;
    border-radius: 7px 7px 0 0;
    text-align:center;
  }

  .error-modal p {
    padding: 1rem;
  }

  .error-modal__actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.5rem;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
  }
  button {
    font: inherit;
    background: #ff2058;
    padding: 0.5rem 2rem;
    color: white;
    border: 1px solid #ff2058;
    margin: 0.5rem 0;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover,
  button:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
  }

  button:focus {
    outline: none;
  }
`;

export default ErrorStyle;
