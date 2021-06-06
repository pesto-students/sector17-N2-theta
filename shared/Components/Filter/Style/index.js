import styled from "styled-components";

const FilterStyle = styled.div`
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
      margin-bottom: 15px;
    }
    li {
      font-size: 1.2rem;
      padding: 5px 10px;
      border-bottom: 1px solid ${(props) => props.theme.color.grey};
    }
    .filter_price {
        margin: 15px 0px;
        padding-bottom: 15px;
        border-bottom: 1px solid ${(props) => props.theme.color.grey};
      .form-group {
        display: flex;
        label{
            margin-right:10px;
        }
        label:last-child{
            margin-left:10px;
        }
      }
      input{
          width:100%;
      }
    }
  }
`;

export default FilterStyle;
