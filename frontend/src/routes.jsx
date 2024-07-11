import { createBrowserRouter } from "react-router-dom";
import {
  Layout,
  Contact,
  Home,
  Login,
  SignUp,
  UserProfile,
  PageNotFound,
} from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
]);

export default router;
