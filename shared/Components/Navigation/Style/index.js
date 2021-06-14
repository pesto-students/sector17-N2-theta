import styled, { css } from "styled-components";

const flex = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const NavigationStyle = styled.nav`
    // max-width: ${(props) => props.theme.maxWidth};
    // margin: 0 auto;
    // padding: 0 30px;

    .nav_active {
        color: ${(props) => props.theme.color.primary};
    }
    ul {
        list-style: none;
        padding: 10px 0;
        margin: 0;
        min-height: 45px;
        ${flex};
        flex-wrap: initial;

        overflow: auto;
        white-space: nowrap;

        li {
            // font-size: 1.6rem;
            font-size: 15px;

            a {
                ${flex};
                @media screen and (max-width: 768px) {
                    gap: 0;
                    flex-wrap: initial;
                    .label {
                        padding-left: 5px;
                        font-size: 14px;
                        padding-right: 10px;
                    }
                }

                &:hover {
                    color: ${(props) => props.theme.color.primary};
                }

                .icon {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: ${(props) => props.theme.color.lightGrey};
                    overflow: hidden;
                    img {
                        width: 200%;
                    }

                    @media screen and (max-width: 768px) {
                        width: 25px;
                        height: 25px;
                    }
                }

                .label {
                }
            }
        }
    }
`;

export default NavigationStyle;
