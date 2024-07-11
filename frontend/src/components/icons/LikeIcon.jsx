import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikeIcon({ liked, ...props }) {
  return liked ? (
    <FontAwesomeIcon icon={solidHeart} role="button" {...props} />
  ) : (
    <FontAwesomeIcon icon={faHeart} role="button" {...props} />
  );
}
