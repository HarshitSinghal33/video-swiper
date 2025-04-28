import { toast } from "react-toastify";
import authAxios from "../lib/authAxios";
import { useCallback, useState } from "react";
import { useVideoContext } from "../context/VideosContext";

const useLikeAction = (videoId: string) => {
  const { videos, handleUpdateVideosData } = useVideoContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleToggleLike = useCallback(async () => {
    try {
      const res = await authAxios.post(isLiked ? "/unlike" : "/like", {
        videoId,
      });
      const {liked, likeCount: updatedLikeCount} = res.data;
      setIsLiked(liked);
      setLikeCount(updatedLikeCount);

      handleUpdateVideosData(
        videos.map((video) =>
          video.id === videoId
            ? { ...video, likeCount: updatedLikeCount }
            : video
        )
      );
    } catch (error) {
      toast.error(`An error occurred ${isLiked ? "unliking" : "liking"} video`);
    }
  }, [isLiked]);

  // const handleLikeVideo = useCallback(async () => {
  //   try {
  //     const res = await authAxios.post("/like", {
  //       videoId,
  //     });
  //     const {liked, likeCount} = res.data;
  //     setIsLiked(liked);
  //     setLikeCount(likeCount);
  //   } catch (error) {
  //     toast.error("An error occurred whle liking video");
  //   }
  // }, []);

  // const handleUnlikeVideo = useCallback(async () => {
  //   try {
  //     const res = await authAxios.post("/unlike", {
  //       videoId,
  //     });
  //     const {liked, likeCount} = res.data;
  //     setIsLiked(liked);
  //     setLikeCount(likeCount);
  //   } catch (error) {
  //     toast.error("An error occurred whle liking video");
  //   }
  // },[]);

  const handleCheckLiked = useCallback(async () => {
    try {
      const res = await authAxios.get(`/videos/${videoId}/checklike`);
      setIsLiked(res.data.liked);
    } catch (error) {
      toast.error("An error occurred while fetching like.");
    }
  }, []);

  return {
    // handleLikeVideo,
    // handleUnlikeVideo,
    handleToggleLike,
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
