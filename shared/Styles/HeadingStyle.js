import styled from "styled-components";

const HeadingStyle = styled.div`
    .heading {
        font-size: 2.875rem;
        margin-top: 60px;
        margin-bottom: 40px;
        text-align: center;

        .heading-underline {
            display: block;
            background: red;
            height: 3px;
            width: 200px;
            position: relative;
            box-sizing: border-box;
            margin: 15px auto;
        }

        @media screen and (max-width: 768px) {
            margin-top: 30px;
            margin-bottom: 30px;
			line-height: normal;


            .heading-underline {
                width: 150px;
				margin: 10px auto;
            }
        }

        .heading-underline:after {
            content: "";
            position: absolute;
            top: -6px;
            left: 50%;
            height: 9px;
            width: 9px;
            background: red;
            transform: rotate(-45deg) translatex(-50%);
        }
    }
`;

export default HeadingStyle;
