import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="flex-fill bg-primary border-2 border-top overflow-y-auto overflow-x-hidden">
      <Outlet />
    </main>
  );
}
