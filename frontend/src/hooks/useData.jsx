import { useContext } from "react";
import { DataContext } from "../contexts/Store";

export default function useData() {
  const dataContext = useContext(DataContext);
  return dataContext;
}
