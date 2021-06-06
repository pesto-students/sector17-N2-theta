import styled from "styled-components";

const CatalogStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px;

  .filters {
    min-width: 300px;
    border: 1px solid ${(props) => props.theme.color.grey};
  }

  .products {
    width: calc(100% - 300px);
  }
`;

export default CatalogStyle;
