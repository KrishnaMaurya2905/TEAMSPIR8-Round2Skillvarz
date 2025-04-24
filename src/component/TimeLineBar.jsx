import { useRef } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { BiPause } from "react-icons/bi";
import { LiaVolumeMuteSolid } from "react-icons/lia";
import { VscUnmute } from "react-icons/vsc";
import { GoUnmute } from "react-icons/go";
import { motion } from "framer-motion";

const formatTime = (seconds) => {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${min}.${sec}`;
};

const TimeLineBar = ({
  duration,
  currentTime,
  onSeek,
  isPlaying,
  togglePlay,
  toggleMute,
  isMuted,
}) => {
  const timelineRef = useRef(null);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  const numberOfTimestamps =
    window.innerWidth < 640
      ? 5
      : window.innerWidth < 786
      ? 8
      : window.innerWidth < 1024
      ? 10
      : window.innerWidth > 1536
      ? 15
      : 12;

  const step = duration / (numberOfTimestamps - 1);
  const timestamps = Array.from(
    { length: numberOfTimestamps },
    (_, i) => i * step
  );

  // Create sub-ticks between major ticks
  const subTicks = [];
  for (let i = 0; i < timestamps.length - 1; i++) {
    const start = timestamps[i];
    const next = timestamps[i + 1];
    const subStep = (next - start) / 5;
    for (let j = 1; j < 5; j++) {
      subTicks.push(start + subStep * j);
    }
  }

  const handleClick = (e) => {
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div className=" absolute flex max-md:flex-col items-center  max-md:justify-center justify-between max-md:gap-5 bottom-5 max-md:bottom-[5vh] left-0 w-screen px-[2%] h-[10vh]">
      <div className="flex items-center justify-between gap-3  font-['poppins'] max-md:w-[95%]  text-white min-w-[8%]">
        <button onClick={togglePlay} className="flex items-center gap-2">
          <span className="text-sm uppercase">
            {isPlaying ? "Playing" : "Paused"}
          </span>
          {isPlaying ? (
            <BiPause className="text-2xl" />
          ) : (
            <IoPlaySharp className="text-lg" />
          )}
        </button>
        <h3 className="text-sm">{formatTime(currentTime)}</h3>
      </div>

      <div className="w-[72%] max-2xl:w-[60%] max-md:w-[90%] relative flex flex-col items-center justify-center  gap-y-5 ">
        {/* Time Labels */}
        <div className="relative w-full h-4">
          {timestamps.map((time, index) => (
            <div
              key={`label-${index}`}
              className="absolute text-white text-[11px] font-['Poppins'] text-center"
              style={{
                left: `${(time / duration) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {formatTime(time)}
            </div>
          ))}
        </div>

        {/* Ticks + Progress Line */}
        <div
          ref={timelineRef}
          onClick={handleClick}
          className="relative w-full h-[25px] cursor-pointer bg-transparent"
        >
          {/* Major Tick Marks */}
          {timestamps.map((time, index) => (
            <div
              key={`major-${index}`}
              className="absolute w-[0.1px] h-[15px] bg-white"
              style={{
                left: `${(time / duration) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}

          {/* Minor Tick Marks */}
          {subTicks.map((time, index) => (
            <div
              key={`minor-${index}`}
              className="absolute w-[0.1px] h-[5px] bg-[#ffffff4c]"
              style={{
                left: `${(time / duration) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}

          {/* Draggable Red Progress Bar */}
          <motion.div
            className="absolute bottom-0 w-[2px] h-[25px] bg-red-500"
            drag="x"
            dragConstraints={timelineRef}
            dragElastic={0}
            onDragEnd={(event, info) => {
              const rect = timelineRef.current.getBoundingClientRect();
              const x = info.point.x - rect.left;
              const newTime = (x / rect.width) * duration;
              onSeek(newTime);
            }}
            animate={{ left: `${progress}%` }}
            transition={{ ease: [0.65, 0, 0.35, 1], duration: 0.3 }}
            style={{ transform: "translateX(-50%)", cursor: "grab" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3  font-['poppins'] max-md:w-[95%]  text-white min-w-[8%]">
        <button onClick={toggleMute} className="flex items-center gap-2">
          <span className="text-sm uppercase">
            {isMuted ? "Unmute" : " Mute"}
          </span>
          {isMuted ? (
            <LiaVolumeMuteSolid className="text-lg" />
          ) : (
            <GoUnmute className="text-lg" />
          )}
        </button>
        <h3 className="text-sm">{formatTime(duration)}</h3>
      </div>
    </div>
  );
};

export default TimeLineBar;
