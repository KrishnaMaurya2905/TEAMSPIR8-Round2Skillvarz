import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import AnimatedText from "./AnimatedText";
import FadeInOnView from "./FadeInOnView";
import BorderAnimation from "./BorderAnimation";
function MoreFeatured({ moreRelated }) {
  const parentRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const [hoveredImage, setHoveredImage] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'

  const handleMouseMove = (e) => {
    const rect = parentRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div
      ref={parentRef}
      className="min-h-[100vh]  max-md:min-h-[60vh] px-[2%] flex items-start pb-[5vh] flex-col gap-8 md:justify-center w-full relative"
      onMouseMove={viewMode === "list" ? handleMouseMove : undefined}
      onMouseLeave={viewMode === "list" ? handleMouseLeave : undefined}
    >
      {/* Header */}
      <div className="flex  justify-between items-center w-full">
        <div className="h-fit  max-sm:mt-[10%] w-full flex gap-10 items-end justify-between pb-10 max-md:pb-5">
          <h1 className="font-['Seri'] font-semibold text-[5.5vw] max-md:text-[8vw] leading-none flex gap-1 uppercase">
            <AnimatedText>More Seasons</AnimatedText>
            <FadeInOnView className="text-sm align-super">[ 5 ]</FadeInOnView>
          </h1>
          <div className="flex gap-5 max-sm:gap-3 py-2">
            <h3
              onClick={() => setViewMode("grid")}
              className={`font-['poppins'] opacity-60 font-semibold max-md:text-sm uppercase cursor-pointer ${
                viewMode === "grid" && "text-white opacity-100"
              }`}
            >
              [ Grid ]
            </h3>
            <h3
              onClick={() => setViewMode("list")}
              className={`font-['poppins'] opacity-60 font-semibold max-md:text-sm uppercase cursor-pointer ${
                viewMode === "list" && "text-white opacity-100"
              }`}
            >
              [ List ]
            </h3>
          </div>
        </div>
      </div>
      <BorderAnimation />
      <AnimatePresence>
        {viewMode === "list" && hoveredImage && (
          <motion.div
            key="hoverImage"
            className="absolute max-sm:h-[20vh] max-sm:w-[50%] h-[35vh] w-[25%] z-10 pointer-events-none overflow-hidden"
            style={{ left: springX, top: springY }}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              className="w-full h-full object-cover"
              src={hoveredImage}
              alt="preview"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {viewMode === "list" ? (
        moreRelated.map((item, index) => (
          <div
            key={index}
            className="flex max-md:py-1  min-w-1/3 max-md:w-full flex-col gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredImage(item.img)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <h1 className="font-['Gothic'] text-7xl font-semibold max-md:text-3xl uppercase leading-none  tracking-wider">
              {item.title}
            </h1>
            <div className="flex uppercase items-end opacity-60 max-sm:text-sm font-['poppins'] font-semibold justify-between">
              <h3>[ {item.subTitle} ]</h3>
              <h3 className="text-sm font-['poppins']">
                [ {item.dateofrelease} ]
              </h3>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center w-full  flex-wrap ">
          {moreRelated.map((item, index) => (
            <div
              className="w-[25%] h-[45vh] overflow-hidden  max-sm:h-[25vh] max-sm:w-[50%] max-sm:p-1 py-10 px-2 "
              key={index}
            >
              <div className="w-full h-[80%] max-sm:h-[70%] ">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-[20%] flex flex-col gap-1 py-4 max-sm:py-2">
                <h1 className="font-['Gothic'] text-2xl max-md:text-sm md:font-semibold  uppercase leading-none tracking-wider ">
                  {item.title}
                </h1>
                <div className=" w-full flex uppercase items-end opacity-60 font-['poppins'] text-[0.8vw] max-md:text-[1vw] justify-between max-sm:text-[2vw] ">
                  <h3 className="w-fit "  >[ {item.subTitle} ]</h3>
                  <h3 className="w-fit " >
                    [ {item.dateofrelease} ]
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BorderAnimation className={`mt-5`} />
    </div>
  );
}

export default MoreFeatured;
