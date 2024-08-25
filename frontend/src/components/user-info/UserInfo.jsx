import React, { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./style.css";
import { useAuth, useAxios, useData } from "../../hooks";
import { Loader } from "../../components";

export default function UserInfo(props) {
  const { storeData, setStoreData } = useData();
  let { user_id } = useAuth().auth;
  const { get } = useAxios();

  const VITE_BACKEND_IMAGE_URI = import.meta.env.VITE_BACKEND_IMAGE_URI;

  const fetchUserDetails = async () => {
    const response = await get(`/user/${user_id}`);

    if (response.status === 200) {
      setStoreData({
        ...storeData,
        user: {
          ...response.data.user,
        },
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {storeData?.user && (
        <Container {...props} className="sticky-bottom" role="button">
          <Row className="user-info d-flex align-items-center m-0 rounded p-2 mb-2">
            <img
              src={
                (storeData?.user?.profile_pic && !storeData?.user?.profile_pic.startsWith('null/'))
                  ? `${VITE_BACKEND_IMAGE_URI}/${storeData.user?.profile_pic}`
                  : "/images/profile-placeholder.svg"
              }
              className="p-0 rounded-circle w-100 h-100"
              style={{
                maxWidth: "40px",
                maxHeight: "40px",
                aspectRatio: 1,
              }}
            />
            <Col md={9} className="text-truncate d-none d-lg-block p-0 ps-2">
              <p className="m-0 text-truncate fw-medium text-white">
                {storeData.user?.fullname || "FullName"}
              </p>
              <p className="m-0 small text-truncate fw-normal text-white">
                {storeData.user?.username || "UserName"}
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
