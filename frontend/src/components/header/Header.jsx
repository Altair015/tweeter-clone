import { NewTweetButton } from "../../components";

export default function Header() {
  return (
    <div className="p-2 d-flex fw-medium sticky-top justify-content-end">
      <NewTweetButton />
    </div>
  );
}
