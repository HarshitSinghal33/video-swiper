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
    handleToggleLike,
    likeCount,
    setLikeCount,
    handleCheckLiked,
    isLiked,
  } = useLikeAction(video.id);

  const fetchIsLike = async () => await handleCheckLiked();

  useEffect(() => {
    fetchIsLike();
    setLikeCount(video.likeCount);
  }, []);

  return (
    <>
      <button onClick={handleToggleLike}>
        {isLiked ? (
          <IoMdHeart {...iconValues} />
        ) : (
          <IoMdHeartEmpty {...iconValues} />
        )}
      </button>
      <div className="count">{likeCount}</div>
    </>
  );
};

export default LikeButton;
