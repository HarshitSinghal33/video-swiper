import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { iconValues } from "../../lib/constants";

interface AudioButtonProps {
  isMuted?: Boolean;
  toggleVideosMute: () => void;
}

const AudioButton: React.FC<AudioButtonProps> = ({ isMuted, toggleVideosMute }) => {
  return (
    <button onClick={toggleVideosMute}>
      {isMuted ? <FaVolumeMute {...iconValues} /> : <FaVolumeUp {...iconValues} />}
    </button>
  );
};

export default AudioButton;
