import styled from "styled-components";

const WishlistStyle = styled.div`
	width: 100%;
    .dashboard {
        > div:first-child {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            grid-template-columns: initial;
            gap: 0;
            > div {
                flex: initial;
                margin-bottom: 15px;
            }
            @media screen and (min-width: 800px) {
                > div {
                    width: calc(50% - 15px);
                }
            }
            @media screen and (min-width: 992px) {
                > div {
                    width: calc(33.3% - 15px);
                }
            }
        }
    }
`;

export default WishlistStyle;
