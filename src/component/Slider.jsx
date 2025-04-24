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
      maxScroll = Math.max(0, wrapWidth - el.clientWidth);
    };

    const move = () => {
      progress = Math.max(0, Math.min(progress, maxScroll));
      if (Math.abs(x - progress) < 0.01) {
        x = progress;
      } else {
        x = lerp(x, progress, 0.075);
      }

      wrap.style.transform = `translateX(${-x}px)`;

      const scaleFactor = 0.0003;
      const clamped = Math.min(1, Math.abs(x - progress) * scaleFactor);
      const scale = 1 - clamped;

      items.forEach((item) => {
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
      progress += (startX - currentX) * 2.25;
      startX = currentX;
    };

    const onDragEnd = () => {
      dragging = false;
    };

    // Event bindings
    calculateWidth();
    move();

    // Resize recalculation
    window.addEventListener("resize", calculateWidth);

    // Input listeners
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("mousedown", onDragStart);
    el.addEventListener("mousemove", onDragMove);
    el.addEventListener("mouseup", onDragEnd);
    el.addEventListener("mouseleave", onDragEnd);
    el.addEventListener("touchstart", onDragStart, { passive: true });
    el.addEventListener("touchmove", onDragMove, { passive: true });
    el.addEventListener("touchend", onDragEnd);

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("resize", calculateWidth);

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
