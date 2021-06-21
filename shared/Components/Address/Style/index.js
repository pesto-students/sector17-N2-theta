import styled from "styled-components";

const AddressStyle = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey};
  
  .form_container {
    padding: 20px;
    .push-right {
      margin: 0 0 0 auto;
    }
    .shipping_address {
      border: 1px solid ${(props) => props.theme.color.grey};
      background: ${(props) => props.theme.color.lightGrey};
      padding: 10px;
      position: relative;

      .address {
        flex: 1;
      }
      
      .action {
        flex: 1;
        text-align: right;
      }
    }

    span {
      font-size: 1.4rem;
      position: relative;
      bottom: 1.2rem;
      padding: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .title {
    border-bottom: 1px solid ${(props) => props.theme.color.grey};
    padding: 10px 20px;
    font-size: 1.8rem;
    font-weight: 600;
  }
  .subtitle {
    padding: 10px;
    text-decoration: underline;
  }
  form {
    span {
      flex: 1;
    }
  }
`;

export default AddressStyle;
