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
      <>
        {loading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        <VideoElement
          ref={ref}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onCanPlayThrough={() => setLoading(false)}
          style={{ visibility: loading ? "hidden" : "visible" }}
        >
          <source src={src} type="video/mp4" />
        </VideoElement>
      </>
    );
  }
);

export default Video;

const LoaderWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;
