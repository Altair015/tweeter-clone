import { Outlet } from "react-router-dom";
import "./style.css";

export default function Main() {
  return (
    <main className="main bg-warning border-2 border-top overflow-auto h-100">
      <Outlet />
    </main>
  );
}
