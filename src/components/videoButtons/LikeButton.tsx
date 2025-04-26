import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { iconValues } from "../../lib/constants";
import { useState } from "react";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };
  return (
    <button className="video-button like" onClick={handleLikeToggle}>
      {isLiked ? (
        <IoMdHeart {...iconValues} />
      ) : (
        <IoMdHeartEmpty {...iconValues} />
      )}
    </button>
  );
};

export default LikeButton;
