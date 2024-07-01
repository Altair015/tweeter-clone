import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function LikeIcon() {
  const [liked, setLiked] = useState(false);
  return liked ? (
    <FontAwesomeIcon
      icon={solidHeart}
      role="button"
      onClick={() => {
        setLiked(false);
      }}
    />
  ) : (
    <FontAwesomeIcon
      icon={faHeart}
      role="button"
      onClick={() => {
        setLiked(true);
      }}
    />
  );
}
