import styled from "styled-components";

const BreadcrumbsStyle = styled.div`
  .breadcrumbs {
    list-style: none;
    margin: 10px 0px;
    a {
      color: ${(props) => props.theme.color.blue};
    }
    li {
      display: inline;
      &:after {
        content: "/";
        padding: 0 5px;
      }
      &:last-child {
        &:after {
          content: "";
        }
      }
    }
  }
`;

export default BreadcrumbsStyle;
