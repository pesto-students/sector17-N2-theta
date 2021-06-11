import styled from 'styled-components';

const QuantityStyle = styled.div`
  margin-top: ${props => props.from == 'product' ? '20px' : '0'};
  margin-bottom: ${props => props.from == 'cart' ? '20px' : '0'};

  ul {
      display: flex;
      flex-direction: column;

      li {
          // flex: 1;
          // background: none;
          // font-weight: bold;
          > div {
              margin-top: 5px;
              display: flex;
              align-items: center;
          }
          button,
          span {
              height: 40px;
          }
          button {
              width: 40px;
              border: 1px solid #efefef;
              background: #efefef;
              line-height: normal;
              box-sizing: border-box;
              font-size: 21px;
              color: #333;
              cursor: pointer;

              &:hover {
                  border-color: #ddd;
                  background: #ddd;
              }
          }
          span {
              padding: 6px 15px;
              position: relative;
              border: 1px solid #efefef;
              width: 70px;
              text-align: center;

              &:hover,
              &:focus {
                  border-color: #ddd;
              }
          }
      }
  }
`;

export default QuantityStyle;