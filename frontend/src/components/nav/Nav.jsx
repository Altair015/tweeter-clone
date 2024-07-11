import { HomeIcon, LogoutIcon, NavLink, ProfileIcon } from "../../components";

export default function Nav() {
  return (
    <nav id="navigation " className="">
      <NavLink key="home-link" label="Home" to="/home" icon={<HomeIcon />} />
      <NavLink
        key="profile-link"
        label="Profile"
        to="/profile"
        icon={<ProfileIcon />}
      />
      <NavLink
        key="logout-link"
        label="Logout"
        to="/login"
        icon={<LogoutIcon />}
      />
    </nav>
  );
}
