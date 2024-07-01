import { AddIcon } from "../../components";

export default function ComposeTweet() {
  return (
    <button className="bg-primary p-2 rounded-1 d-flex align-items-center border border-0 shadow-sm">
      <div
        className="d-flex align-items-center justify-content-center d-sm-none d-flex"
        style={{ width: "30px", height: "30px" }}
      >
        <AddIcon />
      </div>

      <p className="m-0 d-none d-sm-block">Tweet</p>
    </button>
  );
}
