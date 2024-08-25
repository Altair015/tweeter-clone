import { useContext } from "react";
import { ToastifyContext } from "../contexts/Toastify";

export default function useToastify() {
  const toastifyContext = useContext(ToastifyContext);
  return toastifyContext;
}
