import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import Slide from "./components/Slide";
import "./App.css";

const videosUrl = [
  "/01video.mp4",
  "/02video.mp4",
  "/03video.mp4",
  "/04video.mp4",
  "/05video.mp4",
  "/06video.mp4",
];

export default () => {
  return (
    <Swiper
      effect="coverflow"
      modules={[Navigation, EffectCoverflow]}
      navigation={true}
      slidesPerView={"auto"}
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1,
        scale: 1,
      }}
      direction="horizontal"
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(index) => console.log("slide change", index)}
      className="swiper"
    >
      {videosUrl.map((videoUrl) => (
        <SwiperSlide>
          <Slide videoUrl={videoUrl} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
