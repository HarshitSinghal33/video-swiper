import { useEffect, useState, useCallback, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import InnerVideoContainer from "./InnerVideoContainer";
import Loader from "./shared/Loader";
import styled, { keyframes } from "styled-components";
import useFetchVideos from "../hooks/UseFetchVideos";
import Video from "./shared/Video";

const OuterVideoContainer = () => {
  const { videos, isLoading, fetchVideos } = useFetchVideos();
  const [isMuted, setIsMuted] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [videoPerSection, setVideoPerSection] = useState(
    Math.min(Math.floor(window.innerWidth / 180), 10)
  );
  const [currentSection, setCurrentSection] = useState(1);
  const [innerContainerShow, setInnerContainerShow] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleInnerContainerShow = useCallback((index: number) => {
    setInnerContainerShow(true);
    setSelectedVideoIndex(index);
  }, []);

  const handleInnerContainerHide = useCallback(() => {
    setInnerContainerShow(false);
  }, []);

  const prevSection = useCallback(() => {
    if (currentSection > 1) {
      setDirection("left");
      setCurrentSection((prev) => prev - 1);
    }
  }, [currentSection]);

  const nextSection = useCallback(() => {
    const maxSections = Math.ceil(videos.length / videoPerSection);
    if (currentSection < maxSections) {
      setDirection("right");
      setCurrentSection((prev) => prev + 1);
    }
  }, [currentSection, videos.length, videoPerSection]);

  const handleResize = useCallback(() => {
    const newVideoPerSection = Math.floor(window.innerWidth / 180);
    setVideoPerSection(Math.min(newVideoPerSection, 10));

    const maxSections = Math.ceil(videos.length / newVideoPerSection);
    if (currentSection > maxSections) {
      setCurrentSection(maxSections || 1);
    }
  }, [videos.length, currentSection]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
    if (innerContainerShow) {
      allVideos.forEach((video) => {
        video.pause();
      });
    } else {
      allVideos.forEach((video) => {
        video.play().catch((err) => console.error("Video play error:", err));
      });
    }
  }, [innerContainerShow]);

  const videosToDisplay = useMemo(() => {
    return videos.slice(
      (currentSection - 1) * videoPerSection,
      currentSection * videoPerSection
    );
  }, [videos, currentSection, videoPerSection]);

  const maxSections = useMemo(
    () => Math.ceil(videos.length / videoPerSection),
    [videos.length, videoPerSection]
  );

  if (isLoading) return <Loader />;
  if (videos.length <= 0) return <div>No video Found</div>;

  return (
    <Wrapper>
      {currentSection > 1 && (
        <button className="nav-button left" onClick={prevSection}>
          <FaChevronLeft size={40} />
        </button>
      )}

      <div className="video-slider">
        {videosToDisplay.map((video, index) => (
          <VideoWrapper
            direction={direction}
            key={video.id}
            onClick={() =>
              handleInnerContainerShow(
                (currentSection - 1) * videoPerSection + index
              )
            }
          >
            <Video autoPlay={true} muted={true} loop={true} src={video.url}/>
          </VideoWrapper>
        ))}
      </div>

      {innerContainerShow && (
        <InnerVideoContainer
          videos={videos}
          initialIndex={selectedVideoIndex}
          handleInnerContainerHide={handleInnerContainerHide}
          isMuted={isMuted}
          toggleMute={toggleMute}
        />
      )}

      {currentSection < maxSections && (
        <button className="nav-button right" onClick={nextSection}>
          <FaChevronRight size={40} />
        </button>
      )}
    </Wrapper>
  );
};

export default OuterVideoContainer;

const animate = keyframes`
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  overflow: scroll;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .nav-button {
    position: fixed;
    background-color: #333333a7;
    color: white;
    border: none;
    padding: 30px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .nav-button.right {
    right: 0px;
  }

  .video-slider {
    display: flex;
    gap: 20px;
  }
`;

const VideoWrapper = styled.div<{ direction: "left" | "right" }>`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-color: black;
  transform: translateX(
    ${(props) => (props.direction === "left" ? "-100px" : "100px")}
  );
  opacity: 0;
  animation: ${animate} 0.5s ease-out forwards;
`;
