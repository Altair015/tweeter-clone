import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function LocationIcon(props) {
  return <FontAwesomeIcon icon={faLocationDot} role="button" {...props} />;
}
