import { NavLink as RRDNavLink } from "react-router-dom";
import "./style.css";

export default function NavLink({ to, icon, label, ...props }) {
  return (
    <RRDNavLink
      className="nav-link d-flex align-items-center justify-content-center justify-content-lg-start p-2 m-2 bg-primary rounded-1 app-nav-link"
      to={to}
      {...props}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "30px", height: "30px" }}
      >
        {icon}
      </div>

      <p className="m-0 ms-2 d-none d-lg-block text-white">{label}</p>
    </RRDNavLink>
  );
}
