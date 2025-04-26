import VideoController from "../videoButtons";
import { useEffect, useRef, useState } from "react";
import VideoTimingLine from "./VideoTimingLine";
import styled from "styled-components";

interface VideoContainerProps {
  videoUrl: string;
  isActive: boolean;
  isMuted: boolean;
  handleMute: () => void;
}

interface StyledWrapperProps {
  $isActive: Boolean;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  videoUrl,
  isActive,
  isMuted,
  handleMute,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playedTime, setPlayedTime] = useState(0);
  const [totalVideoTime, setTotalVideoTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlayedTime(videoRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    handleMute();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      setTotalVideoTime(videoElement.duration);
      if (isActive) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [isActive, videoRef]);

  return (
    <Wrapper onClick={toggleMute} $isActive={isActive}>
      <VideoTimingLine
        isActive={isActive}
        loadedPercentage={Math.floor((playedTime / totalVideoTime) * 100)}
      />
      <VideoController isActive={isActive} isMuted={isMuted} />
      <video ref={videoRef} muted={isMuted} loop>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </Wrapper>
  );
};

export default VideoContainer;

const Wrapper = styled.div<StyledWrapperProps>`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  display: grid;
  place-items: center;
  pointer-events: ${(props) => (props.$isActive ? "all" : "none")};
`;
