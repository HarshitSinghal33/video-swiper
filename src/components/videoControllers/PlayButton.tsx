import { iconValues } from "../../lib/constants";
import { FaPlay, FaPause } from "react-icons/fa";

interface PlayButtonProps {
  isPlaying: boolean;
  toggleVideoPlay: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  toggleVideoPlay,
}) => {
  return (
    <button onClick={toggleVideoPlay}>
      {isPlaying ? <FaPlay {...iconValues} /> : <FaPause {...iconValues} />}
    </button>
  );
};

export default PlayButton;
