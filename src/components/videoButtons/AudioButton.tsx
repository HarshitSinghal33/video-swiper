import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { iconValues } from "../../lib/constants";

interface AudioButtonProps {
  isVolume?: Boolean;
}

const AudioButton: React.FC<AudioButtonProps> = ({ isVolume }) => {
  return (
    <div className="video-button">
      {isVolume ? <FaVolumeUp {...iconValues} /> : <FaVolumeMute {...iconValues} />}
    </div>
  );
};

export default AudioButton;
