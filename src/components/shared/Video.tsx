import { forwardRef, useState } from "react";
import Loader from "../shared/Loader";
import styled from "styled-components";

interface VideoProps {
  src: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  ref?: React.ReactElement;
}
const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ src, muted, loop, autoPlay }, ref) => {
    const [loading, setLoading] = useState(true);

    return (
      <VideoWrapper>
        {loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
        <video
          ref={ref}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onCanPlayThrough={() => setLoading(false)}
          style={{ visibility: loading ? "hidden" : "visible" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </VideoWrapper>
    );
  }
);

export default Video;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .loader {
    display: grid;
    place-items: center;
    height: 100%;
    background: rgba(0,0,0,0.45)
  }
  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
