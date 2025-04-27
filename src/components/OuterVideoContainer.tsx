import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import InnerVideoContainer from "./InnerVideoContainer";
import Loader from "./shared/Loader";
import styled from "styled-components";
import useFetchVideos from "../hooks/UseFetchVideos";

const OuterVideoContainer = () => {
  const { videos, isLoading, fetchVideos } = useFetchVideos();
  const videoPerSection = Math.floor(window.innerWidth / 180);
  const [currentSection, setCurrentSection] = useState(1);
  const [innerContainerShow, setInnerContainerShow] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleInnerContainerShow = (index: number) => {
    setInnerContainerShow(true);
    setSelectedVideoIndex(index);
  };

  const handleInnerContainerHide = () => {
    setInnerContainerShow(false);
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const nextSection = () => {
    const maxSections = Math.ceil(videos.length / videoPerSection);
    if (currentSection < maxSections) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
    if (innerContainerShow) {
      allVideos.forEach((video) => {
        video.pause();
      });
    } else {
      allVideos.forEach((video) => {
        video.play();
      });
    }
  }, [innerContainerShow]);

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
        {videos
          .slice(
            (currentSection - 1) * videoPerSection,
            currentSection * videoPerSection
          )
          .map((video, index) => (
            <div
              className="video-wrapper"
              key={video.id}
              onClick={() =>
                handleInnerContainerShow(
                  (currentSection - 1) * videoPerSection + index
                )
              }
            >
              <video autoPlay muted loop>
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
          ))}
      </div>

      {innerContainerShow && (
        <InnerVideoContainer
          videos={videos}
          initialIndex={selectedVideoIndex}
          handleInnerContainerHide={handleInnerContainerHide}
        />
      )}

      {!(currentSection >= Math.ceil(videos.length / videoPerSection)) && (
        <button className="nav-button right" onClick={nextSection}>
          <FaChevronRight size={40} />
        </button>
      )}
    </Wrapper>
  );
};

export default OuterVideoContainer;

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
    right: 10px;
  }

  .video-slider {
    display: flex;
    gap: 20px;
  }

  .video-wrapper {
    min-width: 200px;
    min-height: 300px;
    border-radius: 10px;
    background-color: black;
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
