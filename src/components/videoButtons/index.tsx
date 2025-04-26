import AudioButton from "./AudioButton";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

interface VideoControllerProps {
  isActive: Boolean;
  isMuted: Boolean;
}

const VideoController: React.FC<VideoControllerProps> = ({ isActive, isMuted }) => {
  if (!isActive) return null;
  return (
    <div className="video-button-wrapper">
      <AudioButton isMuted={isMuted} />
      <div className="likeShare-button-wrapper">
        <LikeButton />
        <ShareButton />
      </div>
    </div>
  );
};

export default VideoController;
