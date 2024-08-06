import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function CommentsIcon(props) {
  return (
    <FontAwesomeIcon icon={faComment} role="button" color="white" {...props} />
  );
}
