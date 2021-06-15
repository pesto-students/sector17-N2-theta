import styled from "styled-components";

const CatalogStyle = styled.div`
    display: flex;
    justify-content: center;
    padding: 15px 0;

    @media screen and (max-width: 1200px) {
        .product_list {
            > div {
                grid-template-columns: calc((100% - 45px) / 2) calc(
                        (100% - 45px) / 2
                    );
            }
        }
    }
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
    @media screen and (max-width: 600px) {
        .product_list {
            > div {
                grid-template-columns: calc(100% / 1);
            }
        }
    }
    @media screen and (min-width: 768px) {
        gap: 30px;
        padding: 30px 0;
    }

    .filters {
        width: 100%;
        border: 1px solid ${(props) => props.theme.color.grey};
    }
    .products {
        width: 100%;
    }
    .products > .heading {
        margin-bottom: 7px;
        font-weight: 600;
    }

    @media screen and (max-width: 767px) {
        .products {
            margin-top: 15px;
        }
    }
    @media screen and (min-width: 768px) {
        .filters {
            width: 300px;
            border: 1px solid ${(props) => props.theme.color.grey};
        }
        .products {
            width: calc(100% - 300px);
        }
    }

    .filter-mobile-btn {
        background: #fe5a58;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 10px 20px 9px;
        margin-bottom: 15px;
        border-radius: 4px;
        margin-right: auto;

        @media screen and (min-width: 768px) {
            display: none !important;
        }
    }
`;

export default CatalogStyle;
