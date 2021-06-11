import styled from "styled-components";

const ProfileSidebarStyle = styled.div`
  flex: 1;
  margin-right: 30px;
  .myaccount {
    li {
      padding: 10px;
      border: 1px solid ${(props) => props.theme.color.lightGrey};
    }
  }
`;

export default ProfileSidebarStyle;
