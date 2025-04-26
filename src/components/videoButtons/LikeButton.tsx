import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { iconValues } from "../../lib/constants";

interface LikeButtonProps {
  isLiked?: Boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked = false }) => {
  return (
    <div className="video-button">
      {isLiked ? (
        <IoMdHeart {...iconValues} />
      ) : (
        <IoMdHeartEmpty {...iconValues} />
      )}
    </div>
  );
};

export default LikeButton;
