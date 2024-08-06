import { HomeIcon, LogoutIcon, NavLink, ProfileIcon } from "../../components";
import { useAxios, useToastify } from "../../hooks";

export default function Nav() {
  const { post } = useAxios();
  const { setToastContent } = useToastify();

  const handleLogOut = async () => {
    localStorage.removeItem("auth");

    const response = await post("/auth/signout");

    if (response.status === 200) {
      setToastContent({
        content: response.data,
        type: "success",
        duration: 2000,
      });
    }
  };

  return (
    <nav id="navigation" className="">
      <NavLink
        key="home-link"
        label="Home"
        to="/home"
        icon={<HomeIcon className="text-white" />}
      />
      <NavLink
        key="profile-link"
        label="Profile"
        to="/profile"
        icon={<ProfileIcon className="text-white" />}
      />
      <NavLink
        key="logout-link"
        label="Logout"
        to="/login"
        icon={<LogoutIcon className="text-white" />}
        onClick={handleLogOut}
      />
    </nav>
  );
}
