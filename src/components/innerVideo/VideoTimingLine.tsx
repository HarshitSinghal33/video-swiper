import styled from "styled-components";

interface VideoTimingLineProps {
  isActive: Boolean;
  loadedPercentage: number;
}

interface TimeLineWrapperProps {
  $loadedPercentage: number;
}

const VideoTimingLine: React.FC<VideoTimingLineProps> = ({
  loadedPercentage,
  isActive,
}) => {
  if (!isActive) return null;  
  return (
    <TimeLineWrapper $loadedPercentage={loadedPercentage}>
      <div className="loadedLine"></div>
    </TimeLineWrapper>
  );
};

export default VideoTimingLine;

const TimeLineWrapper = styled.div<TimeLineWrapperProps>`
  background: #333;
  width: 90%;
  height: 3px;
  position: absolute;
  z-index: 20;
  top: 5px;
  .loadedLine {
    background: white;
    width: ${(props) => props.$loadedPercentage}%;
    height: 3px;
  }
`;
