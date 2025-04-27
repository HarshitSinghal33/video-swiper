import { toast } from "react-toastify";
import authAxios from "../lib/authAxios";
import { useCallback, useState } from "react";

const useLikeAction = (videoId: string) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleLikeVideo = useCallback(async () => {
    try {
      const res = await authAxios.post("/like", {
        videoId,
      });
      const {liked, likeCount} = res.data;
      setIsLiked(liked);
      setLikeCount(likeCount);
    } catch (error) {
      toast.error("An error occurred whle liking video");
    }
  }, []);

  const handleUnlikeVideo = useCallback(async () => {
    try {
      const res = await authAxios.post("/unlike", {
        videoId,
      });
      const {liked, likeCount} = res.data;
      setIsLiked(liked);
      setLikeCount(likeCount);
    } catch (error) {
      toast.error("An error occurred whle liking video");
    }
  },[]);

  const handleCheckLiked = useCallback(async () => {
    try {
      const res = await authAxios.get(`/videos/${videoId}/like`);
      setIsLiked(res.data.liked);
    } catch (error) {
      toast.error("An error occurred while fetching like.");
    }
  }, []);

  return {
    handleLikeVideo,
    handleUnlikeVideo,
    handleCheckLiked,
    isLiked,
    likeCount,
    setLikeCount
  };
};

const useShareAction = (videoId: string) => {
  const handleShareVideo = async (platform: string) => {
    try {
      await authAxios.post("/share", {
        videoId,
        platform,
      });
    } catch (error) {
      toast.error("An error occurred whle liking video");
    }
  };

  return {
    handleShareVideo,
  };
};

export {useShareAction, useLikeAction};
