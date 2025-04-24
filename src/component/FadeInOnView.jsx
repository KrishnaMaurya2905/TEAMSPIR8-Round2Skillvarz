import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FadeInOnView = ({ children, delay = 0.3, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default FadeInOnView;
