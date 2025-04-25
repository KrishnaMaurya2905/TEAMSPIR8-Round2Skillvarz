import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useSlide } from "../utils/Context";

const Inner = ({ children }) => {
  const overlayControls = useAnimation();
  const contentControls = useAnimation();
  const { setShowSidebar , showSidebar } = useSlide();

  useEffect(() => {
    // Step 1: Animate from scaleX: 0 to scale: 0.09
    contentControls.start({
      scaleX: 1,
      scaleY: 1,
      scale: 0.1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    const timeout1 = setTimeout(() => {
      // Step 2: Shrink overlay's height
      overlayControls.start({
        height: "0%",
        transition: {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // Step 3: Scale fully
      const timeout2 = setTimeout(() => {
        contentControls.start({
          scale: 1,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          },
        });

        // ✅ Show the sidebar when animation finishes
        setTimeout(() => {
          setShowSidebar(true);
        }, 1000);
      }, 1000);

      return () => clearTimeout(timeout2);
    }, 1000);

    return () => clearTimeout(timeout1);
  }, [overlayControls, contentControls, setShowSidebar]);

  return (
    <div className="relative font-['Seri'] w-full text-5xl max-sm:text-2xl gap-x-[12%] h-screen overflow-hidden flex items-center justify-center text-white bg-black">
     {!showSidebar && ( <><h1>
        <span className="opacity-0">A</span>
        CINE
      </h1>
      <h1>VERSE</h1> </>)}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center"
        initial={{ scaleX: 0, scaleY: 1, scale: 0.1 }}
        animate={contentControls}
        style={{ transformOrigin: "center" }}
      >
        {/* White overlay */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-full bg-white z-[5]"
          initial={{ height: "100%" }}
          animate={overlayControls}
        />
        {/* Animated content */}
        <div className="w-full h-full">{children}</div>
      </motion.div>
    </div>
  );
};

export default Inner;
