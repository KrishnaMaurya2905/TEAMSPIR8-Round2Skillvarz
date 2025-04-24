import { motion, useInView } from "framer-motion";
import { Children, isValidElement, useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.01 },
  },
};

const child = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

const AnimatedText = ({ children, className = "" }) => {
  const processNode = (node) => {
    if (typeof node === "string") {
      return node.split("").map((char, i) => (
        <motion.span
          key={i + char}
          variants={child}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ));
    }

    if (isValidElement(node)) {
      return (
        <span className="inline-block" key={Math.random()}>
          {processNode(node.props.children)}
        </span>
      );
    }

    return null;
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {Children.map(children, processNode)}
    </motion.span>
  );
};

export default AnimatedText;
