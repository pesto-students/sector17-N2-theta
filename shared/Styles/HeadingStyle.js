import styled from 'styled-components';

const HeadingStyle = styled.h2`

  .heading-underline {
    display: block;
    background: red;
    height: 3px;
    width: 200px;
    position: relative;
    box-sizing: border-box;
    margin: 15px auto;
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

  .heading {
    font-size: 2.875rem;
    margin-bottom: 40px;
    text-align:center;
  }
`;

export default HeadingStyle;