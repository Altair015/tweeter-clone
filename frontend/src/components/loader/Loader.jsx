import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

export default function Loader() {
  const [loading, setLoading] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((previous) => {
        if (previous === "Loading") return "Loading.";
        else if (previous === "Loading.") return "Loading..";
        else if (previous === "Loading..") return "Loading...";
        else return "Loading";
      });
    }, 800);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="loader"
      className="h-100 d-flex justify-content-center align-items-center"
    >
      <div className="d-flex flex-column align-items-center">
        <Spinner animation="border" size="sm" />
        <p className="fw-semibold p-1">{loading}</p>
      </div>
    </div>
  );
}
