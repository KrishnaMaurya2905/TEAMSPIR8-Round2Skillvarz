import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Paragraph = ({ phrases, className , delay}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.95, once: true });

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: {
        duration: 0.65,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div ref={ref}>
      {phrases.map((phrase, index) => (
        <div key={index} className={`overflow-hidden ${className}`}>
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : "initial"}
            transition={{ delay: delay}}
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  );
};

export default Paragraph;