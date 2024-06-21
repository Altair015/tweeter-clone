import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink
        exact
        to="/home"
        className="nav-link"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            backgroundColor: isActive ? "tomato" : "transparent",
            color: isPending ? "red" : "black",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink to="/contact" className="nav-link">
        Contact
      </NavLink>
    </nav>
  );
}
