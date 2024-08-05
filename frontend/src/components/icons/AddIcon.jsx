import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddIcon(props) {
  return <FontAwesomeIcon icon={faPlus} role="button" {...props} />;
}
