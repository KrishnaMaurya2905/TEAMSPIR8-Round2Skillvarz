
import { motion, AnimatePresence } from "framer-motion";
const PageTransition = ({ children }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed pointer-events-none top-0 left-0 w-full h-full bg-black z-[5]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="relative z-[0]">{children}</div>
    </>
  );
};

export default PageTransition;


