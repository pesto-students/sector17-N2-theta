import styled from "styled-components";

const InputStyle = styled.div`
    flex-wrap: wrap;
    flex: 1;
    width: 45%;
    padding: 10px;
    @media screen and (max-width: 767px) {
        width: 100%;
        flex: inital !important;
    }
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
