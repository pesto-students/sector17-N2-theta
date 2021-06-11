import styled, { css } from "styled-components";

const flex = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const HeaderStyle = styled.header`
    width: 100%;
    min-height: 70px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    background: ${(props) => props.theme.color.white};
    position: sticky;
    top: 0;
    z-index: 12;

    .header__wrapper {
        ${flex};
        min-height: 80px;
        // padding: 0 30px;
        border-bottom: 1px solid ${(props) => props.theme.color.lightGrey};

        .logo {
            a {
                font-size: 3rem;
                color: ${(props) => props.theme.color.primary};
            }
        }

        .header__actions {
            ${flex};
            gap: 0 30px;
            padding-left: 10px;

            .header__action-item {
                position: relative;

                .clickable {
                    ${flex};
                    flex-flow: column;
                    position: relative;
                    cursor: pointer;

                    .icon {
                        width: 30px;
                        background: ${(props) => props.theme.color.lightGrey};
                        font-size: 1.6rem;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 50%;
                        position: relative;

                        .count {
                            width: 18px;
                            line-height: 18px;
                            border-radius: 50%;
                            font-size: 1rem;
                            color: ${(props) => props.theme.color.white};
                            position: absolute;
                            top: -5px;
                            right: -5px;
                            background: ${(props) => props.theme.color.primary};
                        }
                    }

                    .label {
                        font-size: 1.2rem;
                    }
                }

                .header__dropmenu {
                    position: absolute;
                    top: 54px;
                    right: -8px;
                    background: ${(props) => props.theme.color.white};
                    white-space: nowrap;
                    // padding: 0 12px;
                    padding: 10px;
                    border-radius: 3px;
                    border: 1px solid ${(props) => props.theme.color.lightGrey};
                    box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
                    min-width: 170px;

                    #firebaseui_container {
                        white-space: normal;
                        overflow: hidden;
                        width: 255px;
                    }

                    &:before,
                    &:after {
                        content: "";
                        border: 7px solid transparent;
                        border-bottom-color: ${(props) =>
                            props.theme.color.grey};
                        position: absolute;
                        top: -16px;
                        right: 14px;
                    }

                    &:before {
                        filter: blur(3px);
                    }

                    &:after {
                        border-bottom-color: ${(props) =>
                            props.theme.color.white};
                        top: -14px;
                    }

                    ul {
                        li {
                            line-height: 40px;
                            border-bottom: 1px solid
                                ${(props) => props.theme.color.lightGrey};
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
		.header__wrapper {
			position: relative;

			.header__actions {
				gap: 0;
				padding-left: 0;
				margin-top: 10px;
				margin-bottom: 10px;
                width: 100%;
			}

			.header__action-item {
				&.user,
				&.mini-cart {
					position: absolute;
					top: 10px;
					right: 0
				}
				&.user {
					right: 45px
				}
				&.mini-cart {
					right: 0
				}
			}

			.eFbzLN .profile_pic {
				width: 25px;
			}
		}

        #header-search {
            width: 100%;
            form {
                display: flex;
                >input {
                    flex: 1 1;
                }
            }
        }
    }
`;

export default HeaderStyle;
