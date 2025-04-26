import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import VideoContainer from "./components/video";
import "./App.css";
import { useCallback, useState } from "react";

const videos = [
  { url: "/02video.mp4", id: "video2" },
  { url: "/03video.mp4", id: "video3" },
  { url: "/04video.mp4", id: "video4" },
  { url: "/05video.mp4", id: "video5" },
  { url: "/06video.mp4", id: "video6" },
  { url: "/01video.mp4", id: "video1" },
];

export default () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleActiveSlide = (swiper: any) => {
    const { activeIndex } = swiper;
    setActiveSlideIndex(activeIndex);
  };

  const handleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);  

  return (
    <Swiper
      effect="coverflow"
      modules={[Navigation, EffectCoverflow]}
      navigation={true}
      slidesPerView={"auto"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1,
        scale: 1,
      }}
      onSlideChange={handleActiveSlide}
      direction="horizontal"
      className="swiper"
    >
      {videos.map((video, index) => (
        <SwiperSlide key={video.id}>
          <VideoContainer
            videoUrl={video.url}
            handleMute={handleMute}
            isMuted={isMuted}
            isActive={index === activeSlideIndex}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
