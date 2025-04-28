import { useCallback, useState } from "react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { VideoProps } from "../hooks/UseFetchVideos";
import VideoContainer from "./innerVideo";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

interface InnerContainerProps {
  videos: VideoProps[];
  initialIndex: number;
  handleInnerContainerHide: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const InnerVideoContainer: React.FC<InnerContainerProps> = ({
  videos,
  toggleMute,
  isMuted,
  initialIndex,
  handleInnerContainerHide,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleActiveSlide = useCallback((activeIndex: number) => {
    setActiveSlideIndex(activeIndex);
  },[]);

  return (
    <Wrapper>
      <div className="content">
        <IoMdClose
          className="close-icon"
          size={30}
          color="white"
          onClick={handleInnerContainerHide}
        />
        <Swiper
          initialSlide={initialIndex}
          effect="coverflow"
          modules={[Navigation, EffectCoverflow]}
          navigation={true}
          slidesPerView={"auto"}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 1,
          }}
          watchSlidesProgress={true}
          onSlideChange={(swiper) => handleActiveSlide(swiper.activeIndex)}
          direction="horizontal"
        >
          {videos.map((video, index) => {
            return (
              <SwiperSlide key={video.id}>
                <VideoContainer
                  video={video}
                  handleMute={toggleMute}
                  isMuted={isMuted}
                  isActive={index === activeSlideIndex}
                  isInSlide={
                    index === activeSlideIndex - 1 ||
                    index === activeSlideIndex ||
                    index === activeSlideIndex + 1
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Wrapper>
  );
};

export default InnerVideoContainer;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .close-icon {
    align-self: flex-end;
    cursor: pointer;
  }

  .swiper {
    max-width: 600px;
  }
`;
