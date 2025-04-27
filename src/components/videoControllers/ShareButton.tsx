import { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { iconValues } from "../../lib/constants";
import { VideoProps } from "../../hooks/UseFetchVideos";
import ShareVideoModal from "./ShareVideoModal";

interface ShareButtonProps {
  video: VideoProps;
}

const ShareButton: React.FC<ShareButtonProps> = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shareModalToggle = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <button className="video-button share" onClick={shareModalToggle}>
        <IoShareSocial {...iconValues} />
      </button>
      {isModalOpen && <ShareVideoModal video={video} closeModal={shareModalToggle}/>}
    </>
  );
};

export default ShareButton;
