import styled from "styled-components";

const Input = styled.input`
  background: ${props => props.theme.color.lightGrey};
  border: 1px solid ${props => props.theme.color.grey};
  border-radius: 5px;
  padding: 0 15px;
  min-width: 350px;
  min-height: 40px;

  &:focus{
    background: #FFF;
  }
`;

export default Input;
