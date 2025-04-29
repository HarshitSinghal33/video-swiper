import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useFetchVideos, { VideoProps } from "../hooks/UseFetchVideos";
import Loader from "../components/shared/Loader";
import styled from "styled-components";

interface DefaultValueProps {
  videos: VideoProps[];
  handleUpdateVideosData: (data: VideoProps[]) => void;
}

const defaultValues: DefaultValueProps = {
  videos: [],
  handleUpdateVideosData: () => {},
};
const Context = createContext(defaultValues);

const VideosContext = ({ children }: { children: ReactNode }) => {
  const { videos, isLoading, fetchVideos, setVideos } = useFetchVideos();

  const handleUpdateVideosData = useCallback(
    (data: VideoProps[]) => {
      setVideos(data);
    },
    [setVideos]
  );

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (isLoading)
    return (
      <StyledWrapper>
        <Loader />
      </StyledWrapper>
    );
  if (videos.length <= 0) return <div>No videos found</div>;

  return (
    <Context.Provider value={{ videos, handleUpdateVideosData }}>
      {children}
    </Context.Provider>
  );
};

export default VideosContext;
export const useVideoContext = () => useContext(Context);

const StyledWrapper = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
`;
