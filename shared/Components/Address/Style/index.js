import styled from "styled-components";

const AddressStyle = styled.div`
  border: 1px solid ${(props) => props.theme.color.grey};
  .form_container {
    padding: 20px;
    .push-right {
      margin: 0 0 0 auto;
    }
  }
  .title {
    border-bottom: 1px solid ${(props) => props.theme.color.grey};
    padding: 10px 30px;
    font-size: 1.6rem;
  }
  .subtitle {
    padding: 10px;
    text-decoration: underline;
  }
  span {
    flex: 1;
    font-size: 1.2rem;
    position: relative;
    bottom: 1.2rem;
    padding: 10px;
  }
`;

export default AddressStyle;
