import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function DeleteIcon(props) {
  return (
    <FontAwesomeIcon icon={faTrashCan} role="button" color="white" {...props} />
  );
}
