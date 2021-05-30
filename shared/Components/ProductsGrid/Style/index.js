import styled from "styled-components";

const ProductsGridStyle = styled.div`
  .product_grid {
    align-items: center;
  }
  
  @media (min-width: 900px) {
    .product_grid {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`;

export default ProductsGridStyle;
