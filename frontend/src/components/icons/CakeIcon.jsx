import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";

export default function CakeIcon(props) {
  return <FontAwesomeIcon icon={faCakeCandles} role="button" {...props} />;
}
