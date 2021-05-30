import styled from 'styled-components';

const BannerStyle = styled.div`
    .slide{
        
        &.active{
            
        }
        .slick-dots{
            position: relative!important;
            bottom: 0!important;
        }
        .slick-dots li.slick-active button:before {
            opacity: .75;
            color: red!important;
        }
    }
`;

export default BannerStyle;