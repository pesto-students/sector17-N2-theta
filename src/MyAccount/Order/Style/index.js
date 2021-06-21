import styled from "styled-components";

const OrderHistoryStyle = styled.div`
margin-top: 30px;
width: 100%;
display: flex;
.row_group {
  flex-wrap: wrap;
  >div {
    flex-wrap: wrap;
  }
}
.wishlist-wrapper,
.my-account-wrapper {
    width: 100%;
    flex-wrap: wrap;
    > div:first-child {
        width: 100%;
        margin-bottom: 15px;
        margin-right: 0;
        flex: initial;
        @media screen and (min-width: 800px) {
            width: 200px;
            margin-bottom: 0;
        }

        .myaccount {
        }
    }

    .dashboard {
        flex: 1;
        h2{    margin: 0;
    padding: 0;
    position: relative;
    bottom: 1.5rem;}
        table{
            width:100%;
    		    border-collapse: collapse;            
    		td, th {
    		    border: 1px solid #dddddd;
    		    text-align: left;
    		    padding: 8px;
                text-align:left;
    		}
        }
        @media screen and (min-width: 800px) {
            padding-left: 30px;
        }
        @media screen and (max-width: 767px) {
            width: 100%;
        }
        > div:first-child {
            > div {
                width: 100%;
            }
        }
    }
}
`;

export default OrderHistoryStyle;
