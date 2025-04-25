// components/CursorLabel.jsx
import { useSlide } from "../utils/Context";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const CursorLabel = () => {
  const { cursorLabel, cursorPos } = useSlide();

  const mouseX = useMotionValue(cursorPos.x);
  const mouseY = useMotionValue(cursorPos.y);

  // Smooth it out with spring
  const springX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    mouseX.set(cursorPos.x + 12);
    mouseY.set(cursorPos.y + 12);
  }, [cursorPos]);

  return (
    <AnimatePresence>
      {cursorLabel && (
        <motion.div
          key="cursor-label"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed z-[10] font-semibold max-md:hidden pointer-events-none text-white text-xs sm:text-sm font-['poppins'] uppercase tracking-wide"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          [ {cursorLabel} ]
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorLabel;
