import "../App.css";
import AudioButton from "./videoButtons/AudioButton";
import LikeButton from "./videoButtons/LikeButton";
import ShareButton from "./videoButtons/ShareButton";

interface SlideProps {
  videoUrl: string;
}

const Slide: React.FC<SlideProps> = ({ videoUrl }) => {
  return (
    <div style={{ position: "relative" }}>
      <video autoPlay>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="video-button-wrapper">
        <AudioButton />
        <div className="likeShare-button-wrapper">
          <LikeButton />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default Slide;
