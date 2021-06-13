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
        <li className={router.pathname === "/orders" ? "active" : ""}>
          <Link href="/orders">Orders</Link>
        </li>
        <li className={router.pathname === "/wishlist" ? "active" : ""}>
          <Link href="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </ProfileSidebarStyle>
  );
};

export default ProfileSidebar;
