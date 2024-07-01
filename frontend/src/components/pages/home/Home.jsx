import { useLocation, useNavigate } from "react-router-dom";
import { Posts } from "../../../components";
import { useEffect } from "react";

export default function Home() {
  const { pathname: url } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //
    if (url === "/") navigate("/home");
  }, []);

  return <Posts />;
}
