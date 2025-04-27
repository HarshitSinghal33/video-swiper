import { ToastContainer } from "react-toastify";
import "./App.css";
import OuterVideoContainer from "./components/OuterVideoContainer";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="video-container">
        <OuterVideoContainer />
      </div>
    </>
  );
};
