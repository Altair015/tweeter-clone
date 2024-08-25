import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush } from "@fortawesome/free-solid-svg-icons";

export default function PaintBrushIcon(props) {
  return <FontAwesomeIcon icon={faBrush} role="button" {...props} />;
}
