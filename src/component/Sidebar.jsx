// import React, { useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSlide } from "../utils/Context";
// import data from "../utils/data";
// import Border from "./Border";
// import handleDivClick from "../utils/handleDivClick";

// const Sidebar = ({ current, setCursorLabel }) => {
//   const itemRefs = useRef([]);
//   const { showSidebar } = useSlide();
//   const navigate = useNavigate();
//   const sidebarRef = useRef(null);
//   useEffect(() => {
//     const scrollToElementWithEasing = (container, target) => {
//       const start = container.scrollTop;
//       const end = target.offsetTop - container.offsetTop;
//       const duration = 700;
//       const easeInOutCubic = (t) =>
//         t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

//       let startTime;

//       const animate = (time) => {
//         if (!startTime) startTime = time;
//         const elapsed = time - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const ease = easeInOutCubic(progress);

//         container.scrollTop = start + (end - start) * ease;

//         if (progress < 1) {
//           requestAnimationFrame(animate);
//         }
//       };

//       requestAnimationFrame(animate);
//     };

//     const scrollToCurrent = () => {
//       const el = itemRefs.current[current];
//       const container = sidebarRef.current;
//       if (!el || !container) return;

//       const isMobile = window.innerWidth <= 768;

//       if (isMobile) {
//         el.scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "nearest",
//         });
//       } else {
//         scrollToElementWithEasing(container, el);
//       }
//     };

//     const timeout = setTimeout(scrollToCurrent, 50);
//     return () => clearTimeout(timeout);
//   }, [current]);

//   return (
//     <AnimatePresence>
//       {showSidebar && (
//         <motion.div
//           onMouseEnter={() => setCursorLabel("Click")}
//           onMouseLeave={() => setCursorLabel("")}
//           ref={sidebarRef}
//           initial={{ y: "100vh", opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: "100vh", opacity: 0 }}
//           transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
//           className="fixed max-md:top-[90%] max-md:w-[98%] max-md:h-[13vh] top-1/2 -translate-y-1/2 right-5 z-[3] flex w-[8%] h-[96vh] md:flex-col gap-3 md:justify-start pointer-events-auto overflow-y-auto md:overflow-y-scroll max-md:overflow-x-scroll
//  max-xl:w-[15%] max-2xl:right-3 max-2xl:w-[10%] max-md:p-1 max-md:right-0"
//           style={{ willChange: "transform" }}
//         >
//           {data.map((item, index) => {
//             const isActive = index === current;
//             return (
//               <div
//                 key={index}
//                 ref={(el) => (itemRefs.current[index] = el)}
//                 onClick={(e) =>
//                   handleDivClick(
//                     e,
//                     item,
//                     index,
//                     navigate,
//                     item.textData.head.replace(/\s+/g, "")
//                   )
//                 }
//                 className={`relative h-[12%] max-md:h-full max-sm:w-[35%] max-md:w-[25%] w-full flex-shrink-0 transition-all duration-300 ${
//                   isActive ? "p-[5px]" : ""
//                 } cursor-pointer`}
//               >
//                 <img
//                   src={item.img}
//                   alt={`Thumbnail ${index}`}
//                   loading="lazy"
//                   className="h-full w-full object-cover"
//                 />
//                 {isActive && <Border />}
//               </div>
//             );
//           })}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Sidebar;



import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "../utils/Context";
import data from "../utils/data";
import Border from "./Border";
import handleDivClick from "../utils/handleDivClick";

const Sidebar = ({ current, setCursorLabel }) => {
  const itemRefs = useRef([]);
  const { showSidebar } = useSlide();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const scrollToElementWithEasing = (container, target) => {
      if (!container || !target) return;

      const start = container.scrollTop;
      const end = target.offsetTop - container.offsetTop;
      const duration = 700;

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      let startTime;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        container.scrollTop = start + (end - start) * ease;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const scrollToCurrent = () => {
      const el = itemRefs.current[current];
      const container = sidebarRef.current;

      if (!el || !container) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        el.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      } else {
        scrollToElementWithEasing(container, el);
      }
    };

    const timeout = setTimeout(scrollToCurrent, 50);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          ref={sidebarRef}
          onMouseEnter={() => setCursorLabel("Click")}
          onMouseLeave={() => setCursorLabel("")}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="fixed max-md:top-[90%] max-md:w-[98%] max-md:h-[13vh] top-1/2 -translate-y-1/2 right-5 z-[3] flex w-[8%] h-[96vh] md:flex-col gap-3 md:justify-start pointer-events-auto overflow-y-auto md:overflow-y-scroll max-md:overflow-x-scroll max-xl:w-[15%] max-2xl:right-3 max-2xl:w-[10%] max-md:p-1 max-md:right-0"
          style={{ willChange: "transform" }}
        >
          {data.map((item, index) => {
            const isActive = index === current;

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={(e) =>
                  handleDivClick(
                    e,
                    item,
                    index,
                    navigate,
                    item.textData.head.replace(/\s+/g, "")
                  )
                }
                className={`relative h-[12%] max-md:h-full max-sm:w-[35%] max-md:w-[25%] w-full flex-shrink-0 transition-all duration-300 ${
                  isActive ? "p-[5px]" : ""
                } cursor-pointer`}
              >
                <img
                  src={item.img}
                  alt={`Thumbnail ${index}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {isActive && <Border />}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
