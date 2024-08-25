import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
