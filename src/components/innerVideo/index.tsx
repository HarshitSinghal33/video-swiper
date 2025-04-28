import VideoController from "../videoControllers";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoTimingLine from "./VideoTimingLine";
import styled from "styled-components";
import { VideoProps } from "../../hooks/UseFetchVideos";
import Loader from "../shared/Loader";
import Video from "../shared/Video";

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
  isInSlide,
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

  const toggleVideosMute = useCallback(() => {
    handleMute();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  }, []);

  const toggleVideoPlay = useCallback(() => {
    const videoElement = videoRef.current;
    isVideoPlaying ? videoElement?.pause() : videoElement?.play();
    setIsVideoPlaying((prev) => !prev);
  }, [videoRef, isVideoPlaying]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.duration) {
        setTotalVideoTime(videoElement.duration);
      }

      const handleMetadata = () => {
        setTotalVideoTime(videoElement.duration);
      };

      if (isActive) {
        videoElement.play();
      } else {
        videoElement.pause();
      }

      videoElement.addEventListener("loadedmetadata", handleMetadata);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (videoElement) {
          videoElement.removeEventListener("loadedmetadata", handleMetadata);
          videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, [isActive, videoRef]);

  if (!isInSlide) return <Loader />;

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
      <Video ref={videoRef} muted={isMuted} loop={true} src={video.url} />
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

  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
