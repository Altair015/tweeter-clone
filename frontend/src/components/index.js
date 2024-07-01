import { lazy } from "react";

// Pages
export const Home = lazy(() => import("./pages/home/Home"));
export const UserProfile = lazy(() =>
  import("./pages/user-profile/UserProfile")
);
export const PageNotFound = lazy(() =>
  import("./pages/page-not-found/PageNotFound")
);
export const Contact = lazy(() => import("./pages/contact/Contact"));
export const Login = lazy(() => import("./login/Login"));
export const SignUp = lazy(() => import("./sign-up/SignUp"));
export const Layout = lazy(() => import("./layout/Layout"));

// Components
export { default as Footer } from "./footer/Footer";
export { default as Header } from "./header/Header";
export { default as Logo } from "./logo/Logo";
export { default as Nav } from "./nav/Nav";
export { default as Main } from "./main/Main";
export { default as Loader } from "./loader/Loader";
export { default as NavLink } from "./nav-link/NavLink";
export { default as UserInfo } from "./user-info/UserInfo";
export { default as ComposeTweet } from "./new-tweet/ComposeTweet";
export { default as Posts } from "./posts/Posts";
export { default as Post } from "./post/Post";
export { default as PostImage } from "./post-image/PostImage";

// icons
export { default as HomeIcon } from "./icons/HomeIcon";
export { default as LogoutIcon } from "./icons/LogoutIcon";
export { default as ProfileIcon } from "./icons/ProfileIcon";
export { default as AddIcon } from "./icons/AddIcon";
export { default as CommentsIcon } from "./icons/CommentsIcon";
export { default as RetweetIcon } from "./icons/RetweetIcon";
export { default as LikeIcon } from "./icons/LikeIcon";
