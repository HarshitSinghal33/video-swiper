import { IoShareSocial } from "react-icons/io5";
import { iconValues } from "../../lib/constants";

const ShareButton = () => {
  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (navigator.share) {
      const sharedData = {
        title: "it's a title",
        text: "It's a text",
        url: "It's a url",
      };
      await navigator.share(sharedData);
    } else {
      console.error("Share not supported in that browser");
    }
  };
  return (
    <button className="video-button share" onClick={handleShare}>
      <IoShareSocial {...iconValues} />
    </button>
  );
};

export default ShareButton;
