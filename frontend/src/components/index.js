import { lazy } from "react";

// lazy-Components
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
export { default as NewTweetButton } from "./new-tweet-button/NewTweetButton";
export { default as Tweet } from "./tweet/Tweet";
export { default as PostImage } from "./post-image/PostImage";

// icons
export { default as HomeIcon } from "./icons/HomeIcon";
export { default as LogoutIcon } from "./icons/LogoutIcon";
export { default as ProfileIcon } from "./icons/ProfileIcon";
export { default as AddIcon } from "./icons/AddIcon";
export { default as CommentsIcon } from "./icons/CommentsIcon";
export { default as RetweetIcon } from "./icons/RetweetIcon";
export { default as LikeIcon } from "./icons/LikeIcon";
export { default as FileUploadIcon } from "./icons/FileUploadIcon";
export { default as DeleteIcon } from "./icons/DeleteIcon";
export { default as EditBrushIcon } from "./icons/EditBrushIcon";
export { default as PaintBrushIcon } from "./icons/PaintBrushIcon";
export { default as CalenderIcon } from "./icons/CalenderIcon";
export { default as CakeIcon } from "./icons/CakeIcon";
export { default as LocationIcon } from "./icons/LocationIcon";
export { default as EditPenIcon } from "./icons/EditPenIcon";
