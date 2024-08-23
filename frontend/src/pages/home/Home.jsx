import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader, Tweet } from "../../components";
import { useAuth, useAxios, useData } from "../../hooks";

export default function Home() {
  const { user_id } = useAuth().auth;
  const { storeData, setStoreData } = useData();
  const { pathname: url } = useLocation();
  const navigate = useNavigate();
  const { get } = useAxios();

  const [data, setData] = useState(storeData);

  const fetchAllTweets = async () => {
    const response = await get(`/tweet`);

    if (response.status === 200) {
      setData({ user: { userId: user_id }, tweets: [...response.data] });
      setStoreData({ user: { ...storeData?.user, userId: user_id }, tweets: [...response.data] });
    }
  };

  const handleData = (newData) => {
    setData({ ...newData });
  };

  useEffect(() => {
    // in case if the user mistakenly hits "/",
    // there is no page for "/"
    if (url === "/") navigate("/home");

    fetchAllTweets();

    return () => {
      setData(null);
      // setStoreData(null);
    };
  }, []);

  useEffect(() => {
    storeData?.tweet &&
      setData({ ...data, tweets: [storeData.tweet, ...data.tweets] });

    setStoreData({ ...storeData, tweet: null });
  }, [storeData?.tweets]);

  return (
    <>
      {data ? (
        data?.tweets.length ? data?.tweets?.map((tweet, index) => {
          return (
            <Tweet
              key={`tweet-${index}-${tweet._id}`}
              tweet={tweet}
              data={data}
              handleData={handleData}
            />
          );
        }) : <div className="h-100 w-100 m-0 d-flex align-items-center justify-content-center" style={{ maxHeight: "100%" }}>
          <div>
            <h1 className="d-flex align-items-center justify-content-center text-white">Welcome to Chitter</h1>
            <h5 className="text-white">"Think Big. Connect Deeper. Create More."</h5>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
