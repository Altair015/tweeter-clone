import React, { Children } from "react";
import { Outlet } from "react-router-dom";

export default function Main({ children }) {
  return (
    <main>
      <Outlet />
    </main>
  );
}
