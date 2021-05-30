import styled from "styled-components";

const CategoryCardStyle = styled.div`
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.15);
  }

  .category_item {
    img {
      width: 100%;
      display: block;
    }
  }
`;

export default CategoryCardStyle;
