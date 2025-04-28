import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styled from "styled-components";
import { VideoProps } from "../../hooks/UseFetchVideos";
import { useShareAction } from "../../hooks/useVideoAction";
import { FaRegCopy } from "react-icons/fa";

interface ShareModalProps {
  video: VideoProps;
  closeModal: () => void;
}

const ShareVideoModal: React.FC<ShareModalProps> = ({ video, closeModal }) => {
  const { id, url } = video;
  const { handleShareVideo } = useShareAction(id);

  const shareToWhatsapp = () => {
    const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsAppUrl, "_blank");
    handleShareVideo("whatsapp");
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=Check this.`;
    window.open(twitterUrl, "_blank");
    handleShareVideo("twitter");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    handleShareVideo("copy");
  };

  return (
    <StyledModal>
      <button className="close-button" onClick={closeModal}>
        <FaTimes size={20} />
      </button>
      <div className="share-option" onClick={shareToWhatsapp}>
        <div className="icon whatsapp">
          <FaWhatsapp size={24} />
        </div>
        <span>Whatsapp</span>
      </div>
      <div className="share-option" onClick={shareToTwitter}>
        <div className="icon x">
          <FaXTwitter size={24} />
        </div>
        <span>X</span>
      </div>
      <div className="share-option" onClick={copyLink}>
        <div className="icon copy">
          <FaRegCopy size={24} />
        </div>
        <span>Copy link</span>
      </div>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-90%, -50%);
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 4px;
  z-index: 1000;
  width: 280px;
  display: flex;
  justify-content: space-evenly;

  .close-button {
    position: absolute;
    top: 0px;
    right: 3px;
    background: transparent;
    border: none;
    color: #333;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .share-option {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 12px;
    padding: 6px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s;

    .icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .whatsapp {
      background-color: #25d366;
    }

    .x {
      background-color: #000;
    }

    .copy {
      background-color: #f1f1f1;
      color: #333;
    }

    span {
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
  }
`;

export default ShareVideoModal;
