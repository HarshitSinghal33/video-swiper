import "../App.css";

interface SlideProps {
  videoUrl: string;
}

const Slide: React.FC<SlideProps> = ({ videoUrl }) => {
  return (
    <video>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

export default Slide;
