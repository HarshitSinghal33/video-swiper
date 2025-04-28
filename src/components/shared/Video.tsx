import { forwardRef, useState, useEffect, useRef, memo } from "react";
import Loader from "../shared/Loader";
import styled from "styled-components";

interface VideoProps {
  src: string;
  muted?: boolean;
  loop?: boolean;
  observerOptions?: IntersectionObserverInit;
  isVideoPlaying?: boolean;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ src, muted = true, loop = true, isVideoPlaying = true, observerOptions = { threshold: 0.5 } }, ref) => {
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const localRef = useRef<HTMLVideoElement>(null);
    const videoRef = (ref as React.RefObject<HTMLVideoElement>) || localRef;

    useEffect(() => {
      if (!videoRef.current) return;

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      };

      const observer = new IntersectionObserver(handleIntersection, observerOptions);
      observer.observe(videoRef.current);

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }, [videoRef, observerOptions]);

    useEffect(() => {
      if (!videoRef.current) return;

      if (isVisible && videoLoaded && isVideoPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause();
      }
    }, [isVisible, videoLoaded, videoRef]);

    useEffect(() => {
      setLoading(true);
      setVideoLoaded(false);
    }, [src]);

    const handleCanPlay = () => {
      setLoading(false);
      setVideoLoaded(true);
      
      if (isVisible && videoRef.current && isVideoPlaying) {
        videoRef.current.play()
      }
    };

    return (
      <VideoWrapper>
        {loading && (
          <div className="loader">
            <Loader />
          </div>
        )}
        <video
          ref={videoRef}
          muted={muted}
          loop={loop}
          preload="metadata"
          onCanPlayThrough={handleCanPlay}
          style={{ visibility: loading ? "hidden" : "visible" }}
        >
          {isVisible && <source src={src} type="video/mp4" />}
        </video>
      </VideoWrapper>
    );
  }
);

export default memo(Video);

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  
  .loader {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }
  
  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;