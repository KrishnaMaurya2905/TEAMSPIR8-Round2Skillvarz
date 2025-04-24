import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.01;

const FlipLink = ({ children, href }) => {
  const letters = children.split(""); // this includes spaces

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative overflow-hidden whitespace-nowrap uppercase leading-none"
    >
      {/* First layer */}
      <div>
        {letters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={`top-${i}`}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>

      {/* Second layer (hovered state) */}
      <div className="absolute inset-0">
        {letters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={`bottom-${i}`}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default FlipLink;
