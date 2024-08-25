import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

export default function RetweetIcon(props) {
  return (
    <FontAwesomeIcon icon={faRetweet} role="button" color="white" {...props} />
  );
}
