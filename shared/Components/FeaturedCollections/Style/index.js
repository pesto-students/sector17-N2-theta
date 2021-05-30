import styled from "styled-components";

const CollectionsStyle = styled.div`

  .view-all {
    margin-top: 30px;
    text-align: center;

    a {
      display: inline-block;
      border: 1px solid ${props => props.theme.color.black};
      font-size: 1.6rem;
      line-height: 40px;
      padding: 0 20px;
      border-radius: 3px;
      transition: all ease-in-out 0.2s;

      &:hover {
        background: ${props => props.theme.color.primary};
        border-color: ${props => props.theme.color.primary};
        color: ${props => props.theme.color.white};
      }
    }
  }
`;

export default CollectionsStyle;
