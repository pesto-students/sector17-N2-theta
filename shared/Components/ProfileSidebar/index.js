import Link from "next/link";
import { useRouter } from "next/router";
import ProfileSidebarStyle from "./Style";

const ProfileSidebar = () => {
  const router = useRouter();
  return (
    <ProfileSidebarStyle>
      <ul className="myaccount">
        <li className={router.pathname === "/profile" ? "active" : ""}>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <Link href="/profile/orders">Orders</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wislist</Link>
        </li>
      </ul>
    </ProfileSidebarStyle>
  );
};

export default ProfileSidebar;
