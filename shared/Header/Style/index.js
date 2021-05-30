import styled, { css } from 'styled-components';

const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderStyle = styled.header`
  width: 100%;
  min-height: 70px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
  background: ${props => props.theme.color.white};
  position: sticky;
  top: 0;
  z-index: 1;

  .header__wrapper {
    ${flex};
    min-height: 80px;
    padding: 0 30px;
    border-bottom: 1px solid ${props => props.theme.color.lightGrey};

    .logo {
      font-size: 3rem;
      color: ${props => props.theme.color.primary}
    }
    
    .header__actions {
      ${flex};
      gap: 0 30px;
    }
  }
`;

export default HeaderStyle;