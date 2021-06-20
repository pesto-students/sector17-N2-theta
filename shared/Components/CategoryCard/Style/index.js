import styled from "styled-components";

const CategoryCardStyle = styled.div`
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.15);
  }

  .category_item {
    position: relative;

    img {
      width: 100%;
      display: block;
    }

    .name {
      position: absolute;
      line-height: 30px;
      padding: 0 10px;
      background: rgba(255,255,255,0.8);
      top: 10px;
      left: 10px;
      border-radius: 3px;
      box-shadow: 0 0 5px 0 rgba(0,0,0,0.1)
    }
  }
`;

export default CategoryCardStyle;
