import styled from "styled-components";

const CategoryGridStyle = styled.div`
  .category_grid {
    align-items: center;
  }
  @media (min-width: 900px) {
    .category_grid {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`;

export default CategoryGridStyle;
