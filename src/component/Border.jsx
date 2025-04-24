import { motion } from "framer-motion";

const Border = ({ height = 8, width = 8 }) => {
  const cornerVariants = {
    initial: { width: 0, height: 0 },
    animate: { width: width, height: height },
  };

  const transition = {
    duration: 0.4,
    ease: "easeInOut",
  };
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 border-t-[1.5px] border-l-[1.5px] border-[#ffffffa9]"
        variants={cornerVariants}
        initial="initial"
        animate="animate"
        transition={transition}
      />
      <motion.div
        className="absolute top-0 right-0 border-t-[1.5px] border-r-[1.5px] border-[#ffffffa9]"
        variants={cornerVariants}
        initial="initial"
        animate="animate"
        transition={transition}
      />
      <motion.div
        className="absolute bottom-0 left-0 border-b-[1.5px] border-l-[1.5px] border-[#ffffffa9]"
        variants={cornerVariants}
        initial="initial"
        animate="animate"
        transition={transition}
      />
      <motion.div
        className="absolute bottom-0 right-0 border-b-[1.5px] border-r-[1.5px] border-[#ffffffa9]"
        variants={cornerVariants}
        initial="initial"
        animate="animate"
        transition={transition}
      />
    </>
  );
};

export default Border;
