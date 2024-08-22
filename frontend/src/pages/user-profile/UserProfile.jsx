import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  CakeIcon,
  CalenderIcon,
  EditBrushIcon,
  EditPenIcon,
  FileUploadIcon,
  Loader,
  PaintBrushIcon,
  Tweet,
} from "../../components";
import LocationIcon from "../../components/icons/LocationIcon";
import { useAuth, useAxios, useData, useToastify } from "../../hooks";
import "./style.css";
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  // Hooks
  const { pathname } = useLocation();
  const { put, get, post } = useAxios();
  const { storeData, setStoreData } = useData();
  let { user_id } = useAuth().auth;
  const { user_id: loggedUser } = useAuth().auth;
  const { setToastContent } = useToastify();

  // States
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState({
    status: false,
    // options : user_details, profil_pic or profile_cover
    target: null,
  });
  const [imgPreview, setImagePreview] = useState(null);
  // UI work-around for hover effect
  const [onProfilePic, setOnProfilePic] = useState(false);
  const [followersCount, setFollowersCount] = useState(null);

  //Refs
  const inputRef = useRef(null);

  // Javascript Vars
  const VITE_BACKEND_IMAGE_URI = import.meta.env.VITE_BACKEND_IMAGE_URI;

  if (!pathname.includes("profile")) user_id = pathname.split("r/")[1];

  const handleClose = (e) => {
    e?.stopPropagation();

    setShowModal({
      status: false,
      target: null,
    });

    setImagePreview(null);
  };

  const handleEditProfilePic = () => {
    if (user_id !== loggedUser) return;
    setShowModal({ status: true, target: "profile_pic" });
  };

  const handleEditProfileCover = () => {
    if (user_id !== loggedUser) return;
    setShowModal({ status: true, target: "profile_cover" });
  };

  const handleEditProfile = () => {
    setShowModal({ status: true, target: "user_details" });
  };


  const handleUserFollow = async () => {

    // if following the user, remove the id (UNFOLLOW)
    if (data.user.followers.includes(`${loggedUser}`)) {
      // removing the id in followers
      const updatedFollowers = data.user.followers.filter(
        (follower) => follower !== `${loggedUser}`
      );

      // taking the logged in user id from cookie
      const response = await put(pathname, { type: "unfollow" });

      setData({ ...data, user: { ...data.user, followers: updatedFollowers } });
      setFollowersCount((pre) => pre - 1);
    }

    // if not following the user, add the id (FOLLOW)
    if (!data.user.followers.includes(`${loggedUser}`)) {
      // adding the id in followers
      const updatedFollowers = [...data.user.followers, `${loggedUser}`];

      // taking the logged in user id from cookie
      const response = await put(pathname, { type: "follow" });

      setData({ ...data, user: { ...data.user, followers: updatedFollowers } });
      setFollowersCount((pre) => pre + 1);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullname = e.target["user-profile-fullname"]?.value;

      const location = e.target["user-profile-location"]?.value;
      const dob = e.target["user-profile-dob"]?.value;
      const profile_pic = e.target["user-profile-pic"]?.files;
      const profile_cover = e.target["user-profile-cover"]?.files;

      if (!profile_cover && !profile_pic && !fullname) {
        setToastContent({
          content: "Fullname can not be empty",
          type: "warning",
          duration: 2000,
        });
        return;
      }

      const formData = new FormData();

      fullname && formData.append("fullname", fullname);
      location && formData.append("location", location);
      dob && formData.append("dob", dob);
      profile_pic?.length &&
        formData.append("image", profile_pic[0], "profile_pic");
      profile_cover?.length &&
        formData.append("image", profile_cover[0], "profile_cover");

      const response = await post(`/user/${user_id}`, formData);

      if (response.status === 201) {
        const { fullname, location, dob, profile_pic, profile_cover } =
          response.data;


        setData({
          ...data,
          user: {
            ...data.user,
            fullname,
            location,
            dob,
            // cache busting or cache invalidation.
            // As name of the file remain same react will be never know
            // OR "Cache-Control: no-cache" as header
            profile_pic: profile_pic,
            profile_cover: profile_cover
              ? `${profile_cover}/?image-version=${new Date().getTime()}`
              : profile_cover,
          },
        });

        console.log(response.data)
        if (user_id === loggedUser) {
          setStoreData({
            ...storeData,
            user: {
              ...storeData.user,
              ...response.data,
              profile_pic: response.data.profile_pic
              ,
            },
          });
        }

        setShowModal({
          status: false,
          target: null,
        });

        setImagePreview(null);

        setToastContent({
          content: "Profile successfully updated",
          type: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = (newData) => {
    setData({ ...newData });
  };

  async function fetchProileData() {
    const response = await get(`/user/${user_id}`);

    if (response.status === 200) {
      setData({
        user: {
          ...response.data.user,
          userId: loggedUser,
        },
        tweets: response.data.tweets,
      });
      setFollowersCount(response.data.user.followers.length);
    }
  }

  useEffect(() => {
    fetchProileData();

    return () => {
      // reset the userInfo
      // setData(null)
    }
  }, [pathname]);

  // to manage focus on edit
  useEffect(() => {
    if (showModal.status) inputRef.current?.focus();
  }, [showModal.status]);

  return data ? (
    <>
      <div id="user-profile-page" className="h-100 d-flex flex-column">
        <div className="position-relative" onClick={handleEditProfileCover}>
          {/* Banner */}
          <img
            id="user-profile-banner"
            className="w-100 object-fit-cover border-2 border-bottom h-100"
            style={{ maxHeight: "300px" }}
            src={
              data.user.profile_cover
                ? `${VITE_BACKEND_IMAGE_URI}/${data.user.profile_cover}`
                : "/images/profile-cover-placeholder.jpeg"
            }
          />

          {user_id === loggedUser && (
            <div
              className="user-profile-banner-icon-placholder w-100 h-100 position-absolute top-0"
              role="button"
            >
              <PaintBrushIcon
                id="user-banner-edit-icon"
                className="p-2 position-absolute end-0 rounded rounded-2 m-1"
                size="xs"
              />
            </div>
          )}
        </div>

        {/* Profile Pic & User details & Following/Followers*/}
        <div className="border-2 border-bottom border-top-0 border-right-0 border-left-0">
          {/* Profile Pic*/}
          <div
            className="profile-image position-relative"
            style={{
              width: "25%",
            }}
            role={user_id === loggedUser ? "button" : ""}
            onClick={handleEditProfilePic}
          >
            <img
              className="z-1 object-fit-cover ratio ratio-1x1 rounded-circle border border-2 start-0 position-absolute translate-middle-y ms-4 w-100 "
              style={{
                maxWidth: "150px",
                minWidth: "50px",
                maxHeight: "150px",
              }}
              src={
                data.user.profile_pic
                  ? `${VITE_BACKEND_IMAGE_URI}/${data.user.profile_pic}`
                  : "/images/profile-placeholder.webp"
              }
              onMouseEnter={() => {
                if (user_id === loggedUser) setOnProfilePic(true);
              }}
            />
            {onProfilePic && (
              <div
                className="user-profile-icon-placeholder z-2 position-absolute translate-middle-y ms-4 ratio ratio-1x1 rounded-circle w-100"
                style={{
                  maxWidth: "150px",
                  minWidth: "50px",
                }}
                onMouseLeave={() => {
                  setOnProfilePic(false);
                }}
              >
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <EditBrushIcon id="user-profile-edit-icon" className="z-5" />
                </div>
              </div>
            )}
          </div>

          {/* Edit/Follow/Unfollow Row */}
          <div className="d-flex justify-content-between flex-wrap p-2">
            <div
              id="dummy-placeholder"
              className="h-0 z-0"
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
              <Button
                variant="primary"
                className="fw-medium"
                onClick={
                  user_id === loggedUser ? handleEditProfile : handleUserFollow
                }
              >
                <div className="d-flex align-items-center">
                  {user_id === loggedUser && (
                    <EditPenIcon className="text-white" />
                  )}
                  <p
                    className={`m-0 ${user_id === loggedUser ? "ms-2" : ""
                      } fs-7 text-white`}
                    style={{ transform: "translateY(1px)" }}
                  >
                    {user_id === loggedUser
                      ? "Edit Profile"
                      : data.user.followers.includes(`${loggedUser}`)
                        ? "Unfollow"
                        : "Follow"}
                  </p>
                </div>
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div className="user-profile-name-username-section p-2 ms-2">
            <p className="m-0 fw-medium fs-4 text-white">
              {data.user.fullname}
            </p>
            <p className="m-0 fw-normal text-white">{data.user.username}</p>
          </div>

          {/* DOB & Location*/}
          {(data.user.dob || data.user.location) && (
            <div className="user-profile-dob-location-section p-2 pb-0 ms-2 d-flex">
              {data.user.dob && (
                <div className="d-flex align-items-center">
                  <CakeIcon className="text-white" />
                  <p
                    className=" m-0 ms-2 fs-7 text-white"
                    style={{ transform: "translateY(1px)" }}
                  >{`DOB ${new Date(data.user.dob).toDateString()}`}</p>
                </div>
              )}
              {data.user.location && (
                <div
                  className={`d-flex align-items-center ${!!data.user.dob && "ms-4"
                    } text-white`}
                >
                  <LocationIcon className="text-white" />
                  <p
                    className=" m-0 ms-2 fs-7 text-white"
                    style={{ transform: "translateY(1px)" }}
                  >{`Location ${data.user.location}`}</p>
                </div>
              )}
            </div>
          )}

          {/* Joined On*/}
          <div className="user-profile-joined-section p-2 ms-2 d-flex align-items-center">
            <CalenderIcon className="text-white" />
            <p
              className=" m-0 ms-2 fs-7 text-white"
              style={{ transform: "translateY(1px)" }}
            >{`Joined ${new Date(data.user.createdAt).toDateString()}`}</p>
          </div>

          {/* Following & Followers*/}
          <div className="user-profile-followers-following-section p-2 ms-2 d-flex">
            <p className="m-0 fw-medium text-white">{`Following ${data.user.following?.length}`}</p>
            <p className="m-0 ms-3 fw-medium text-white">{`Followers ${followersCount}`}</p>
          </div>
        </div>

        {/* Tweets Section*/}
        <div className="user-profile-tweets-section px-2 pb-2 d-flex flex-column align-items-center  w-100 flex-fill">
          <h5 className="my-2 text-white">Tweets</h5>

          <div className="d-flex flex-column align-items-center border-2 border rounded rounded-2 w-100 justify-content-center flex-fill">
            {data?.tweets.length ? (
              data.tweets.map((tweet) => (
                <Tweet
                  key={`user-profile-tweet-${tweet._id
                    }-${new Date().getTime()}`}
                  tweet={tweet}
                  data={data}
                  handleData={handleData}
                  disableDelete={user_id !== loggedUser}
                />
              ))
            ) : (
              <h2 className="text-white">No Tweets</h2>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal.status} onHide={handleClose}>
        <Form onSubmit={handleOnSubmit} autoComplete="off">
          {showModal.target === "user_details" && (
            <>
              <Modal.Header closeButton>
                <Modal.Title className="h5">Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-2" controlId="user-profile-fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    placeholder="eg : Mrinand Khacher"
                    defaultValue={data.user.fullname}
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="user-profile-location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    placeholder="eg : Place, Country"
                    defaultValue={data.user.location}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="user-profile-dob">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    placeholder="dd-MM-yyyy"
                    type="date"
                    defaultValue={
                      data.user.dob
                        ? format(new Date(data.user.dob), "yyyy-MM-dd")
                        : ""
                    }
                  />
                </Form.Group>
              </Modal.Body>
            </>
          )}
          {(showModal.target === "profile_pic" ||
            showModal.target === "profile_cover") && (
              <>
                <Modal.Header closeButton>
                  <Modal.Title className="h5">
                    Edit Profile
                    {showModal.target === "profile_pic" ? "Picture" : "Cover"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    controlId={`user-profile-${showModal.target === "profile_pic" ? "pic" : "cover"
                      }`}
                    className="px-2 mb-2 d-flex align-items-center"
                  >
                    <Form.Label
                      className="bg-primary d-flex justify-content-center align-items-center rounded rounded-2 text-white m-0"
                      style={{ width: "30px", height: "30px" }}
                      role="button"
                    >
                      <FileUploadIcon />
                    </Form.Label>
                    <span className="ms-2 text-secondary">Upload Image</span>
                    <Form.Control
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.currentTarget.files.length < 0) return;
                        const image = e.currentTarget.files[0];

                        const [fileType, imageFormat] = image.type.split("/");

                        if (
                          ["jpeg", "jpg", "png", "webp"].includes(imageFormat)
                        ) {
                          const previewURL = URL.createObjectURL(image);
                          setImagePreview(previewURL);
                        } else {
                          setToastContent({
                            content:
                              'supported image type ("jpeg", "jpg", "png", "webp")',
                            type: "error",
                            duration: 5000,
                          });
                        }
                      }}
                    />
                  </Form.Group>

                  {imgPreview && (
                    <div className="w-100 d-flex justify-content-center">
                      <img
                        src={imgPreview || "/images/posts-images/1.jpg"}
                        className="w-75 rounded rounded-2 h-100 object-fit-contain"
                        style={{ maxHeight: "50vh" }}
                      />
                    </div>
                  )}
                </Modal.Body>
              </>
            )}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  ) : (
    <Loader />
  );
}
