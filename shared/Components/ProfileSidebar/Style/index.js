import styled from "styled-components";

const ProfileSidebarStyle = styled.div`
  flex: 1;
  margin-right: 30px;
  .myaccount {
    li {
      padding: 10px;
      border: 1px solid ${(props) => props.theme.color.lightGrey};
    }
    .active a {
      color: ${(props) => props.theme.color.primary};
    }
  }
`;

export default ProfileSidebarStyle;
