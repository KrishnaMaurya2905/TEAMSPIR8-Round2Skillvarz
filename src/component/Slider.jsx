// import React, { useEffect } from "react";

// const Slider = ({ Sliderdata }) => {
//   useEffect(() => {
//     const DragScroll = function (obj) {
//       const el = document.querySelector(obj.el);
//       const wrap = document.querySelector(obj.wrap);
//       const items = document.querySelectorAll(obj.item);

//       let progress = 0;
//       let oldX = 0;
//       let dragging = false;
//       let startX = 0;
//       let x = 0;
//       let maxScroll;

//       const init = () => {
//         calculate();
//         events();
//         animateScroll();
//       };

//       const calculate = () => {
//         const wrapWidth = items[0].clientWidth * items.length;
//         wrap.style.width = `${wrapWidth}px`;
//         maxScroll = wrapWidth - el.clientWidth;
//       };

//       const handleWheel = (e) => {
//         progress += e.deltaY;
//         move();
//       };

//       const handleDragStart = (e) => {
//         e.preventDefault();
//         dragging = true;
//         startX = e.clientX || e.touches[0].clientX;
//       };

//       const handleDragMove = (e) => {
//         if (!dragging) return;
//         const x = e.clientX || e.touches[0].clientX;
//         progress += (startX - x) * 2.5;
//         startX = x;
//         move();
//       };

//       const handleDragEnd = () => {
//         dragging = false;
//       };

//       const move = () => {
//         progress = Math.max(0, Math.min(progress, maxScroll));
//         x = lerp(x, progress, 0.1);
//         wrap.style.transition = "transform 0.3s ease-out";
//         wrap.style.transform = `translateX(${-x}px)`;
//         oldX = x;
//         scaleItems();
//       };

//       const scaleItems = () => {
//         items.forEach((item) => {
//           item.style.transition = "transform 0.5s ease-out";
//           item.style.transform = `scale(${
//             1 - Math.abs(x - progress) * 0.0009
//           })`;
//         });
//       };

//       const events = () => {
//         el.addEventListener("wheel", handleWheel);
//         el.addEventListener("mousedown", handleDragStart);
//         el.addEventListener("mousemove", handleDragMove);
//         el.addEventListener("mouseup", handleDragEnd);
//         el.addEventListener("mouseleave", handleDragEnd);
//         el.addEventListener("touchstart", handleDragStart);
//         el.addEventListener("touchmove", handleDragMove);
//         el.addEventListener("touchend", handleDragEnd);
//       };

//       const animateScroll = () => {
//         move();
//         requestAnimationFrame(animateScroll);
//       };

//       const lerp = (start, end, amt) => {
//         return (1 - amt) * start + amt * end;
//       };

//       init();
//     };

//     const scroll = new DragScroll({
//       el: ".slider",
//       wrap: ".slider-wrapper",
//       item: ".slider-item",
//     });

//     return () => {
//       const slider = document.querySelector(".slider");
//       if (!slider) return;

//       slider.removeEventListener("wheel", scroll.handleWheel);
//       slider.removeEventListener("mousedown", scroll.handleDragStart);
//       slider.removeEventListener("mousemove", scroll.handleDragMove);
//       slider.removeEventListener("mouseup", scroll.handleDragEnd);
//       slider.removeEventListener("mouseleave", scroll.handleDragEnd);
//       slider.removeEventListener("touchstart", scroll.handleDragStart);
//       slider.removeEventListener("touchmove", scroll.handleDragMove);
//       slider.removeEventListener("touchend", scroll.handleDragEnd);
//     };
//   }, []);

//   return (
//     <div className="h-[55vh] max-2xl:h-[50vh] max-md:h-[45vh] max-sm:h-[25vh] max-md:w-[98%]  w-[96%] mx-auto relative overflow-hidden flex items-center justify-center  ">
//       <div className="slider w-full cursor-grab">
//         <div className="slider-wrapper whitespace-nowrap">
//           {Sliderdata.map((item, index) => (
//             <div
//               key={index}
//               className="slider-item inline-block w-[25vw] max-lg:w-[35vw] max-2xl:w-[30vw]  max-sm:w-[45vw] px-[5px] "
//             >
//               <div className="relative max-md:h-[30vh] max-sm:h-[18vh]  h-[35vh] overflow-hidden">
//                 <img
//                   className="absolute w-full object-cover h-full"
//                   src={item.img}
//                   alt=""
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;

import React, { useEffect, useRef } from "react";
import { useSlide } from "../utils/Context";

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const Slider = ({ Sliderdata }) => {
  const { setCursorLabel } = useSlide();
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrame = useRef(null);

  useEffect(() => {
    const el = sliderRef.current;
    const wrap = wrapperRef.current;
    const items = itemRefs.current;

    if (!el || !wrap || items.length === 0) return;

    let progress = 0;
    let dragging = false;
    let startX = 0;
    let currentX = 0;
    let x = 0;
    let maxScroll = 0;

    const calculateWidth = () => {
      const wrapWidth = items[0].offsetWidth * items.length;
      wrap.style.width = `${wrapWidth}px`;
      maxScroll = wrapWidth - el.clientWidth;
    };

    const move = () => {
      progress = Math.max(0, Math.min(progress, maxScroll));
      x = lerp(x, progress, 0.1);
      wrap.style.transform = `translateX(${-x}px)`;

      items.forEach((item) => {
        const scale = 1 - Math.abs(x - progress) * 0.0003;
        item.style.transform = `scale(${scale})`;
      });

      animationFrame.current = requestAnimationFrame(move);
    };

    const onWheel = (e) => {
      progress += e.deltaY;
    };

    const onDragStart = (e) => {
      dragging = true;
      startX = e.clientX || e.touches?.[0].clientX;
    };

    const onDragMove = (e) => {
      if (!dragging) return;
      currentX = e.clientX || e.touches?.[0].clientX;
      progress += (startX - currentX) * 2.5;
      startX = currentX;
    };

    const onDragEnd = () => {
      dragging = false;
    };

    // Initial setup
    calculateWidth();
    move();

    // Event Listeners
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("mousedown", onDragStart);
    el.addEventListener("mousemove", onDragMove);
    el.addEventListener("mouseup", onDragEnd);
    el.addEventListener("mouseleave", onDragEnd);
    el.addEventListener("touchstart", onDragStart, { passive: true });
    el.addEventListener("touchmove", onDragMove, { passive: true });
    el.addEventListener("touchend", onDragEnd);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame.current);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mousedown", onDragStart);
      el.removeEventListener("mousemove", onDragMove);
      el.removeEventListener("mouseup", onDragEnd);
      el.removeEventListener("mouseleave", onDragEnd);
      el.removeEventListener("touchstart", onDragStart);
      el.removeEventListener("touchmove", onDragMove);
      el.removeEventListener("touchend", onDragEnd);
    };
  }, [Sliderdata]);

  return (
    <div className="h-[55vh] max-2xl:h-[50vh] max-md:h-[45vh] max-sm:h-[25vh] max-md:w-[98%] w-[96%] mx-auto relative overflow-hidden flex items-center justify-center">
      <div ref={sliderRef} className="slider w-full cursor-grab">
        <div
          ref={wrapperRef}
          onMouseEnter={() => setCursorLabel("Drag")}
          onMouseLeave={() => setCursorLabel("")}
          className="slider-wrapper whitespace-nowrap transition-transform duration-300 ease-out"
        >
          {Sliderdata.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="slider-item inline-block w-[25vw] max-lg:w-[35vw] max-2xl:w-[30vw] max-sm:w-[45vw] px-[5px] transition-transform duration-300 ease-out"
            >
              <div className="relative max-md:h-[30vh] max-sm:h-[18vh] h-[35vh] overflow-hidden">
                <img
                  className="absolute w-full h-full object-cover"
                  src={item}
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
