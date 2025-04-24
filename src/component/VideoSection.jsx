// import React, { useEffect, useState ,  } from "react";
// import TimeLineBar from "./TimeLineBar";
// const VideoSection = ({ videoRef, currentData }) => {
//   const [videoDuration, setVideoDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const updateTime = () => setCurrentTime(video.currentTime);
//     video.addEventListener("timeupdate", updateTime);

//     return () => video.removeEventListener("timeupdate", updateTime);
//   }, []);

//   const handleSeek = (time) => {
//     const video = videoRef.current;
//     if (video) {
//       video.currentTime = time;
//       setCurrentTime(time);
//     }
//   };

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     video.muted = !video.muted;
//     setIsMuted(video.muted);
//   };
//   return (
//     <div className="sticky top-0 h-screen max-sm:h-[85vh] overflow-hidden max-sm:p-2 w-full z-[1]">
//       <video
//         ref={videoRef}
//         muted={isMuted}
//         loop
//         className="w-full h-full max-sm:h-[60%] max-sm:mt-[10vh] object-cover"
//         src={currentData.video}
//         onLoadedMetadata={(e) =>
//           setVideoDuration(Math.floor(e.target.duration))
//         }
//       />
//       <TimeLineBar
//         duration={videoDuration}
//         currentTime={currentTime}
//         onSeek={handleSeek}
//         isPlaying={isPlaying}
//         togglePlay={togglePlay}
//         isMuted={isMuted}
//         toggleMute={toggleMute}
//       />
//     </div>
//   );
// };

// export default VideoSection;import React, { useEffect, useState } from "react";


import { useEffect, useState, useCallback } from "react";
import TimeLineBar from "./TimeLineBar";
import { useSlide } from "../utils/Context";

const VideoSection = ({ videoRef, currentData }) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { setCursorLabel } = useSlide();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [videoRef]);

  const handleSeek = useCallback(
    (time) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = time;
      setCurrentTime(time);
    },
    [videoRef]
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = video.paused;
    if (shouldPlay) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying(shouldPlay);
    setCursorLabel(shouldPlay ? "Pause" : "Play");
  }, [videoRef, setCursorLabel]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, [videoRef]);

  const handleMouseEnter = useCallback(() => {
    setCursorLabel(isPlaying ? "Pause" : "Play");
  }, [isPlaying, setCursorLabel]);

  const handleMouseLeave = useCallback(() => {
    setCursorLabel("");
  }, [setCursorLabel]);

  return (
    <div
      className="sticky top-0 h-screen max-sm:h-[85vh] overflow-hidden max-sm:p-2 w-full z-[1]"
    
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        className="w-full h-full max-sm:h-[60%] max-sm:mt-[10vh] object-cover"
        src={currentData.video}
        onLoadedMetadata={(e) =>
          setVideoDuration(Math.floor(e.target.duration))
        }
        onClick={togglePlay}
      />
      <TimeLineBar
        duration={videoDuration}
        currentTime={currentTime}
        onSeek={handleSeek}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default VideoSection;
