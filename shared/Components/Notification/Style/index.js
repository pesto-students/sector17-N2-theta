import styled from 'styled-components';

const NotificationStyle = styled.div`
    position: fixed;
    top: ${props => props.visible ? '20px' : "-100%"};
    left: 50%;
    transform: translateX(-50%);
    z-index: 13;
    transition: all ease-in-out 0.5s;
    background: #FE5351;
    color: #fff;
    padding: 5px 10px 5px 20px;
    border-radius: 5px;

    button {
      background: transparent;
      border: 0;
      color: #fff;
      margin-left: 10px;
      cursor: pointer;
    }
`;

export default NotificationStyle;