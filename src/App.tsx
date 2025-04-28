import { ToastContainer } from "react-toastify";
import "./App.css";
import OuterVideoContainer from "./components/OuterVideoContainer";
import "react-toastify/dist/ReactToastify.css";
import VideosContext from "./context/VideosContext";

export default () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <VideosContext>
        <div className="video-container">
          <OuterVideoContainer />
        </div>
      </VideosContext>
    </>
  );
};
