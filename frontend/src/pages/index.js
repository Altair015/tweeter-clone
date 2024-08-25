import { lazy } from "react";

// Pages
export const Home = lazy(() => import("./home/Home"));
export const UserProfile = lazy(() => import("./user-profile/UserProfile"));
export const PageNotFound = lazy(() => import("./page-not-found/PageNotFound"));
export const ResourceNotFound = lazy(() =>
  import("./resource-not-found/ResourceNotFound")
);
export const Login = lazy(() => import("./login/Login"));
export const SignUp = lazy(() => import("./sign-up/SignUp"));
export const Tweet = lazy(() => import("./tweet/Tweet"));
