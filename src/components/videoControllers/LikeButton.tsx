import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { iconValues } from "../../lib/constants";
import { VideoProps } from "../../hooks/UseFetchVideos";
import { useEffect } from "react";
import { useLikeAction } from "../../hooks/useVideoAction";

interface LikeButtonProps {
  video: VideoProps;
}

const LikeButton: React.FC<LikeButtonProps> = ({ video }) => {
  const {
    handleLikeVideo,
    handleUnlikeVideo,
    likeCount,
    setLikeCount,
    handleCheckLiked,
    isLiked,
  } = useLikeAction(video.id);
  const handleLikeToggle = async () => {
    if (isLiked) {
      await handleUnlikeVideo();
    } else {
      await handleLikeVideo();
    }
  };

  const fetchIsLike = async () => await handleCheckLiked();

  useEffect(() => {
    fetchIsLike();
    setLikeCount(video.likeCount);
  }, [video]);

  return (
    <div>
      <button onClick={handleLikeToggle}>
        {isLiked ? (
          <IoMdHeart {...iconValues} />
        ) : (
          <IoMdHeartEmpty {...iconValues} />
        )}
      </button>
      <div className="count">{likeCount}</div>
    </div>
  );
};

export default LikeButton;
