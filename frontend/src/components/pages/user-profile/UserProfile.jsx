import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { useAxios } from "../../../hooks";

export default function UserProfile() {
  const { get } = useAxios();

  useEffect(() => {
    // get("")
  }, []);

  return (
    <div id="user-profile-page" className="">
      <img
        id=""
        className="w-100 object-fit-cover border-2 border-bottom"
        style={{ height: "300px" }}
        src="./images/posts-images/2.jpg"
      />
      <div className="position-relative">
        <img
          id=""
          className="rounded-circle border border-2 start-0 position-absolute translate-middle-y ms-4"
          style={{
            width: "25%",
            maxWidth: "150px",
            minWidth: "50px",
          }}
          src="./images/profile-images/2.jpeg"
        />
        <div className="d-flex justify-content-between flex-wrap p-2">
          <div
            id="dummy"
            className="ms-2 bg-danger h-0 "
            style={{
              height: "0",
              width: "25%",
              maxWidth: "150px",
              minWidth: "50px",
              opacity: "0",
              paddingBottom: "max(25px,calc(min(25%,150px) / 2))",
            }}
          >
            x
          </div>
          <div>
            <Button variant="outline-warning" className="fw-medium">
              Edit profile
            </Button>
          </div>
        </div>

        <div className="p-2">
          <p className="m-0 fw-medium fs-4">Mandeep Singh</p>
          <p className="m-0 fw-normal">@Mandeep4651231</p>
        </div>
      </div>
    </div>
  );
}
