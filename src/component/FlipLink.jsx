import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.01;

const FlipLink = ({ children, onClick }) => {
  const letters = children.split("");

  return (
    <motion.button
      type="button"
      initial="initial"
      whileHover="hovered"
      className="relative overflow-hidden whitespace-nowrap uppercase leading-none bg-transparent border-none p-0 cursor-pointer"
      onClick={onClick}
    >
      {/* Top Layer */}
      <div aria-hidden="true">
        {letters.map((l, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>

      {/* Bottom Layer */}
      <div className="absolute inset-0" aria-hidden="true">
        {letters.map((l, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
};

export default FlipLink;
