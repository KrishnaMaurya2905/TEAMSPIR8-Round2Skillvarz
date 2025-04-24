import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import FlipLink from "./FlipLink";

const Category = ({ goToSlide, current, showSidebar }) => {
  const categoryData = [
    {
      name: "K - Drama",
      items: 3,
      firstItem: 0,
    },
    {
      name: "TV Shows",
      items: 4,
      firstItem: 3,
    },
    {
      name: "Movies",
      items: 4,
      firstItem: 7,
    },
    {
      name: "Web Series",
      items: 2,
      firstItem: 11,
    },
  ];

  const categoryRef = useRef(null);

  const handleClick = (index) => {
    if (index === current) return;

    const direction = index > current ? 1 : -1;
    goToSlide(index, direction);
  };

  // Motion variants for category animation
  const categoryVariants = {
    hidden: {
      opacity: 0,
      y: 40, // Initial position off-screen
    },
    visible: {
      opacity: 1,
      y: 0, // Final position
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={categoryRef}
      className="absolute z-[4] top-[40%] -translate-y-1/2 left-10 h-fit w-fit text-[1.5rem] leading-none uppercase font-black text-white space-y-3"
      initial="hidden"
      animate={showSidebar ? "visible" : "exit"}
      variants={categoryVariants}
    >
      {categoryData.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(item.firstItem)}
          className="cursor-pointer flex items-start gap-1"
        >
          <FlipLink>{item.name}</FlipLink>{" "}
          <span className="text-xs align-super">[ {item.items} ]</span>
        </div>
      ))}
    </motion.div>
  );
};

export default Category;
