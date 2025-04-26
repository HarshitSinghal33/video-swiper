import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { iconValues } from "../../lib/constants";

interface AudioButtonProps {
  isMuted?: Boolean;
}

const AudioButton: React.FC<AudioButtonProps> = ({ isMuted }) => {
  return (
    <button className="video-button">
      {isMuted ? <FaVolumeMute {...iconValues} /> : <FaVolumeUp {...iconValues} />}
    </button>
  );
};

export default AudioButton;
