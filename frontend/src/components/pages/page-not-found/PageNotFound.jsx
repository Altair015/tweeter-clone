import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const url = useLocation();
  console.log(url);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-danger">
      <div className=" d-flex align-items-end">
        <h1 className="display-3 lh-1">Page Not Found&nbsp;</h1>
        <h1 className="display-6 lh-base m-0 fw-bold">404</h1>
      </div>
      <div className="display-6 d-flex" style={{ maxWidth: "140px" }}>
        <h1 className=" fs-6 fst-italic align-self-end text-truncate ">
          "{url?.pathname}"&nbsp;
        </h1>
        <h1 className="fs-6 align-self-end">
          <a href="/home" className="text-decoration-none">
            Home
          </a>
        </h1>
      </div>
    </div>
  );
}
