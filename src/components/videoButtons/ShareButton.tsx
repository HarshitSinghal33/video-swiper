import { IoShareSocial } from "react-icons/io5";
import { iconValues } from "../../lib/constants";

const ShareButton = () => {
  return (
    <div className="video-button">
      <IoShareSocial {...iconValues} />
    </div>
  );
};

export default ShareButton;
