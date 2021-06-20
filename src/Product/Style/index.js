import styled from "styled-components";

const ProductDetailStyle = styled.div`
    .breadcrumbs {
        list-style: none;
        margin: 20px 0px !important;
        li {
            display: inline;
            &:after {
                content: "/";
                padding: 0 5px;
            }
            &:last-child {
                &:after {
                    content: "";
                }
            }
        }
    }
    .product_view_container {
        margin-top: 20px;
    }
    .product_gallery {
        display: flex;
        @media screen and (min-width: 768px) {
            padding-right: 20px;
        }
        img {
            width: 100%;
        }
        .product_thumbnail {
            padding-right: 15px;
            @media screen and (min-width: 768px) {
                padding-right: 20px;
            }
            ul li {
                // background: ${(props) => props.theme.color.grey};
                text-align: center;
                padding: 0 0;
                margin-bottom: 10px;
                height: 50px;
                width: 50px;
                border: 1px solid #ddd;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.3s;
                &:hover {
                    opacity: 0.7;
                }
                @media screen and (min-width: 768px) {
                    margin-bottom: 15px;
                }
                @media screen and (min-width: 992px) {
                    height: 80px;
                    width: 80px;
                }
            }
            ul li img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .product_full {
            border: 1px solid #ddd;
            transition: all 0.2s ease-in-out 0s;
            flex: 1 1;
            padding: 10px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
            }
            @media screen and (min-width: 768px) {
                padding: 15px;
                height: 450px;
            }
            @media screen and (min-width: 992px) {
                padding: 15px;
                height: 500px;
            }
        }
    }
    .product_info {
        .product_title {
            color: ${(props) => props.theme.color.black};
            font-size: 2.6rem;
            margin-top: -5px;
        }

        .review {
            color: ${(props) => props.theme.color.yellow};
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 2px;
            line-height: 20px;
            margin-bottom: 10px;

            .fa {
                font-size: 1.6rem;
            }

            .count {
                color: ${(props) => props.theme.color.darkGrey};
                margin-left: 5px;
            }
        }

        .price {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            gap: 10px;
            min-width: 50%;

            .main-price {
                font-size: 2.6rem;
                font-weight: 600;
                color: ${(props) => props.theme.color.black};
            }

            .stike-through {
                font-size: 1.6rem;
                color: ${(props) => props.theme.color.darkGrey};
                text-decoration: line-through;
            }
        }

        .add-to-cart {
            width: 200px;
            min-height: 50px;
            font-size: 2.2rem;
            color: ${(props) => props.theme.color.white};
            background: ${(props) => props.theme.color.primary};
            transition: all ease-in-out 0.2s;
            cursor: pointer;
            border: none;
            margin: 35px 0px;
            .plus {
                margin-left: 10px;
                font-size: 19px;
            }
        }

        .extra_option {
            span {
                font-size: 1rem;
                display: block;
                margin-top: 2px;
                color: #777;
            }
            label {
                font-weight: bold;
                clear: both;
                display: block;
                margin-bottom: 5px;
            }
            .pincode_input {
                position: relative;
                display: inline-block;
                input {
                    background: ${(props) => props.theme.color.white};
                    border: 1px solid ${(props) => props.theme.color.grey};
                    border-radius: 5px;
                    padding: 0 15px;
                    min-width: 350px;
                    min-height: 40px;
                }
                button {
                    color: ${(props) => props.theme.color.darkGrey};
                    background: none;
                    border: 0px;
                    position: absolute;
                    right: 5px;
                    cursor: pointer;
                    top: 12px;
                }
            }
        }
    }
    .description {
        background: ${(props) => props.theme.color.lightGrey};
        padding: 30px;
        text-align: center;
        div {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            table {
                // flex: 1;
                width: 100%;
                @media screen and (min-width: 768px) {
                    width: calc(50% - 15px);
                }
                tr {
                    border-bottom: 1px solid
                        ${(props) => props.theme.color.grey};
                }
                th {
                    text-align: left;
                    width: 50%;
                }
                td {
                    width: 50%;
                    text-align: left;
                    color: ${(props) => props.theme.color.darkGrey};
                    @media screen and (min-width: 768px) {
                        text-align: right;
                    }
                }
            }
        }
    }
    .wishlist-btn {
        display: inline-block;

        button {
            margin-left: 10px;
            height: 50px;
            position: relative;
            width: 50px;
            font-size: 22px;
            border-radius: 0;
            border: 1px solid #999;
            background: #ffffff;
            cursor: pointer;

            .fa-heart{
                color: #FE5351;
            }
        }
    }
`;

export default ProductDetailStyle;
