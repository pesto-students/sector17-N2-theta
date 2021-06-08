import styled from 'styled-components';

const PageStyle = styled.div`
  background: white;
  color: ${props => props.theme.black};

  .page__inner{
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    min-height: 50vh;
  }
`;

export default PageStyle;