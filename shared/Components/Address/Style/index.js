import styled from "styled-components";

const AddressStyle = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey};
  
  .form_container {
    padding: 20px;

    .row_group {
      gap: 20px;

      label {
        font-size: 1.2rem;
      }

      .field {
        &:not(.error){
          &>div{
            padding: 0 0 5px;
          }
        }
        &.error{
          &>div{
            padding: 0;
          
            input {
              border-color: #ff0000;
            }
          }
        }
      }

      .error{
        color: #ff0000;
        font-size: 1.2rem;
      }
    }

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
      font-size: 1.2rem;
      position: relative;
      bottom: 10px;
      padding: 10px 10px 10px 0;
      color: #777
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
