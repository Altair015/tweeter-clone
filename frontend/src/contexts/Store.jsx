import { createContext, useEffect, useState } from "react";
import { useAuth, useAxios } from "../hooks";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { auth } = useAuth();
  const [data, setData] = useState({
    user: {
      tweets: [],
      username: null,
      fullname: null,
    },
    tweets: [],
  });
  const initialState = { data, setData };
  const { get } = useAxios();

  useEffect(() => {
    // async function fetchData() {
    //   // get user_data, tweets
    //   const reponse = await get(`/user/${auth.user_id}`);
    //   console.log(reponse);
    // }
    // fetchData();
    // const fetchAllTweets = async () => {
    //   const getAllTweets = await get("/tweet");
    //   console.log(getAllTweets);
    //   setData({ ...data, tweets: getAllTweets });
    // };
    // fetchAllTweets();
  }, [auth.token]);

  return (
    <DataContext.Provider value={initialState}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
