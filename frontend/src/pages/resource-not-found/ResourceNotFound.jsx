import { useLocation, useNavigate } from "react-router-dom";

export default function ResourceNotFound() {
  const url = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-danger">
      <div className=" d-flex align-items-end">
        <h1 className="display-3 lh-1">Resource Not Found&nbsp;</h1>
        <h1 className="display-6 lh-base m-0 fw-bold">404</h1>
      </div>
      <div className="display-6 d-flex" style={{ maxWidth: "140px" }}>
        <h1 className="fs-6 align-self-end">
          <p
            className="m-0"
            onClick={() => {
              navigate("/home");
            }}
            role="button"
          >
            <a class="link-opacity-100 link-offset-1">Home</a>
          </p>
        </h1>
      </div>
    </div>
  );
}
