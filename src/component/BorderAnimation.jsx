import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const BorderAnimation = ({className}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: "100%",
        transition: { duration: 1.2, ease: "easeInOut" },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ width: "0%" }}
      animate={controls}
      className={`w-full ${className}`}
      style={{
        borderBottom: "max(0.1rem, 1px) dashed hsla(0, 0%, 100%, 0.8)",
        height: "1px", // just for layout consistency
        overflow: "hidden",
      }}
    />
  );
};

export default BorderAnimation;
