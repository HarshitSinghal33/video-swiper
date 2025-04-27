import VideoController from "../videoControllers";
import { useEffect, useRef, useState } from "react";
import VideoTimingLine from "./VideoTimingLine";
import styled from "styled-components";
import { VideoProps } from "../../hooks/UseFetchVideos";

interface VideoContainerProps {
  isActive: boolean;
  isMuted: boolean;
  handleMute: () => void;
  video: VideoProps;
  isInSlide: boolean;
}

interface StyledWrapperProps {
  $isActive: Boolean;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  isActive,
  isMuted,
  handleMute,
  video,
  isInSlide
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [playedTime, setPlayedTime] = useState(0);
  const [totalVideoTime, setTotalVideoTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPlayedTime(videoRef.current.currentTime);
    }
  };

  const toggleVideosMute = () => {
    handleMute();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleVideoPlay = () => {
    const videoElement = videoRef.current;
    if(isVideoPlaying){
      videoElement?.pause();
      setIsVideoPlaying(false);
    }else{
      videoElement?.play();
      setIsVideoPlaying(true);
    }
  }

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

  if(!isInSlide) return null;

  return (
    <Wrapper $isActive={isActive}>
      <VideoTimingLine
        isActive={isActive}
        loadedPercentage={Math.floor((playedTime / totalVideoTime) * 100)}
      />
      <VideoController
        toggleVideoPlay={toggleVideoPlay}
        isActive={isActive}
        isPlaying={isVideoPlaying}
        isMuted={isMuted}
        toggleVideosMute={toggleVideosMute}
        video={video}
      />
      <video ref={videoRef} muted={isMuted} height={"500px"} loop>
        <source src={video.url} type="video/mp4" />
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
