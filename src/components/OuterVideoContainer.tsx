import { useEffect, useState, useCallback } from "react";
import InnerVideoContainer from "./InnerVideoContainer";
import styled from "styled-components";
import Video from "./shared/Video";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useVideoContext } from "../context/VideosContext";

const OuterVideoContainer = () => {
  const {videos} = useVideoContext();
  const [isMuted, setIsMuted] = useState(true);
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

  return (
    <Wrapper>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={"auto"}
        direction="horizontal"
        slidesPerGroupAuto={true}
        breakpoints={{
          2400: {
            slidesPerView: 10,
            slidesPerGroup: 10,
          }
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide>
            <VideoWrapper
              key={video.id}
              onClick={() => handleInnerContainerShow(index)}
            >
              <Video
                muted={true}
                loop={true}
                src={video.url}
                observerOptions={{
                  root: null,
                  rootMargin: "100px",
                  threshold: 0.1,
                }}
              />
            </VideoWrapper>
          </SwiperSlide>
        ))}
      </Swiper>

      {innerContainerShow && (
        <InnerVideoContainer
          videos={videos}
          initialIndex={selectedVideoIndex}
          handleInnerContainerHide={handleInnerContainerHide}
          isMuted={isMuted}
          toggleMute={toggleMute}
        />
      )}
    </Wrapper>
  );
};

export default OuterVideoContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: scroll;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .nav-button {
    all: unset;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    padding: 30px 8px;
    color: white;
    z-index: 10;

    &.right {
      right: 0;
    }
  }
`;

const VideoWrapper = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-color: black;
  flex-shrink: 0;
`;
