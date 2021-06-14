import styled from "styled-components";

const InputStyle = styled.div`
  flex: 1;
  width: 45%;
  padding:10px;
  input {
    background: ${(props) => props.theme.color.lightGrey};
    border: 1px solid ${(props) => props.theme.color.grey};
    border-radius: 5px;
    padding: 0 15px;
    width: 100%;
    min-height: 40px;

    &:focus {
      background: #fff;
    }
  }
`;

export default InputStyle;
