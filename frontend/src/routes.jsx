import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components";
import {
  Home,
  Login,
  SignUp,
  UserProfile,
  PageNotFound,
  Tweet,
  ResourceNotFound,
} from "./pages";

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
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "tweet/:tweet_id",
        element: <Tweet />,
      },
      {
        path: "resource",
        element: <ResourceNotFound />,
      },
      {
        path: "user/:user_id",
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
