import styled from "styled-components";
import { VideoProps } from "../../hooks/UseFetchVideos";
import AudioButton from "./AudioButton";
import LikeButton from "./LikeButton";
import PlayButton from "./PlayButton";
import ShareButton from "./ShareButton";

interface VideoControllerProps {
  isActive: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  toggleVideosMute: () => void;
  toggleVideoPlay: () => void;
  video: VideoProps;
}

const VideoController: React.FC<VideoControllerProps> = ({
  video,
  toggleVideoPlay,
  isActive,
  isMuted,
  isPlaying,
  toggleVideosMute,
}) => {
  if (!isActive) return null;
  return (
    <StyledWrapper>
      <div className="video-controllers">
        <PlayButton toggleVideoPlay={toggleVideoPlay} isPlaying={isPlaying} />
        <AudioButton isMuted={isMuted} toggleVideosMute={toggleVideosMute} />
      </div>

      <div className="video-actions">
        <LikeButton video={video} />
        <ShareButton video={video} />
      </div>
    </StyledWrapper>
  );
};

export default VideoController;

const StyledWrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60%;
  width: 90%;

  .video-controllers {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  button {
    all: unset;
    padding: 12px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    cursor: pointer;
    margin-top: 15px;
    z-index: 10;
    position: relative;
  }

  .video-actions {
    position: absolute;
    right: 0;
    top: 60%;
  }

  .count {
    color: white;
    margin-top: 5px;
  }
`;
