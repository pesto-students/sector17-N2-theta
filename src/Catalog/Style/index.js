import styled from "styled-components";

const CatalogStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px;

  .filters {
    min-width: 300px;
    border: 1px solid ${(props) => props.theme.color.grey};
    .filter_action {
      border-bottom: 1px solid ${(props) => props.theme.color.grey};
      padding: 10px;
      display: flex;
      font-size: 1.8rem;
      font-weight: bold;
      span {
        flex: 1;
        &:last-child {
          text-align: right;
        }
      }
      .filter_clear {
        color: ${(props) => props.theme.color.primary};
        cursor: pointer;
        font-size: 1.2rem;
      }
    }
    .filter_options {
      padding: 10px;
      .filter_title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom:15px;
      }
      li {
        font-size: 1.2rem;
        padding:5px 10px;
        border-bottom:  1px solid ${(props) => props.theme.color.grey};
      }
    }
  }

  .products {
    width: 100%;
  }
`;

export default CatalogStyle;
