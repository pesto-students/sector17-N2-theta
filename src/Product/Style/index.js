import styled from 'styled-components';

const ProductDetailStyle = styled.div`
.product_gallery {
    display:flex;
    img{
        width:100%
    }
    .product_thumbnail{
        ul li{
            background: ${props => props.theme.color.grey}
        }
        ul li img{
            max-width:60px;
        }
    }
}
.product_info{
}
`;

export default ProductDetailStyle;