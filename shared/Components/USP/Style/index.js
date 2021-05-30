import styled from "styled-components";

const USPStyle = styled.div`
  .usp_row {
    margin: 40px auto 0 auto;
  }
  .usp_item {
    /* flex: 1; */
    flex-basis: 30%;
    background-color: #f9f9f9;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
  }
  .usp_item span {
    font-size: 18px;
    justify-content: space-between;
    padding-right: 10px;
    line-height: 1.5;
  }
  @media (min-width: 900px) {
    .usp_row {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default USPStyle;
