import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

export default function CalenderIcon(props) {
  return <FontAwesomeIcon icon={faCalendar} role="button" {...props} />;
}
