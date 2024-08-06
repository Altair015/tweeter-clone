import { createContext, useEffect, useState } from "react";
import { useAuth, useAxios } from "../hooks";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [storeData, setStoreData] = useState({
    user: {
      tweets: [],
      username: null,
      fullname: null,
      profile_pic: null,
    },
    tweets: [],
  });
  const initialState = { storeData, setStoreData };

  return (
    <DataContext.Provider value={initialState}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
