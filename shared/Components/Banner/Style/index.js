import styled from 'styled-components';

const BannerStyle = styled.div`
    .slide {
        img {
            width: 100%;
        }
    }

    .slick-dots{
        position: relative;
        bottom: 0;
    }

    .slick-dots li.slick-active button:before {
        opacity: .75;
        color: ${props => props.theme.color.primary}
    }
`;

export default BannerStyle;