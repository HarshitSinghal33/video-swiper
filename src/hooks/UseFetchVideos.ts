import { useCallback, useState } from "react";
import authAxios from "../lib/authAxios";
import { toast } from "react-toastify";

export interface VideoProps {
  url: string;
  id: string;
  title: string;
  description: string;
  likeCount: number;
  shareCount: number;
}

const useFetchVideos = () => {
  const [videos, setVideos] = useState<VideoProps[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get("/videos");
      setVideos(response.data);
    } catch (error: any) {
      setError(error.message);
      toast.error("Error Ocurred: while fetching videos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { videos, error, isLoading, fetchVideos, setVideos };
};

export default useFetchVideos;
