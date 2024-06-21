import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components";

const LazyHome = lazy(() => import("./components/main/home/Home"));
const LazyUserProfile = lazy(() =>
  import("./components/main/user-profile/UserProfile")
);
const LazyContact = lazy(() => import("./components/main/contact/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <LazyHome />,
      },
      {
        path: "contact",
        element: <LazyContact />,
      },
      {
        path: "profile",
        element: <LazyUserProfile />,
      },
    ],
  },
]);

export default router;
