import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
const Button = ({
  text,
  customclass,
  p,
  circ,
  backgroundColor = "#fff",
  ...attributes
}) => {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className={` cursor-pointer group ${
          customclass ? customclass : "text-white bg-[#000000]"
        }  relative flex items-center justify-center px-6 max-sm:px-5 py-2`}
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        <p className={`font-['Gothic'] max-sm:text-xs max-md:text-sm uppercase ${p} transition-all duration-200 delay-100`}>
          {text}
        </p>
        <div
          ref={circle}
          className={`w-full absolute h-[150%] ${circ} z-[-1] rounded-[50%] top-[100%]`}
        ></div>
      </div>
    </Magnetic>
  );
};

export default Button;

const Magnetic = ({ children }) => {
  const magnetic = useRef(null);
  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    magnetic.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
      magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    });
    magnetic.current.addEventListener("mouseleave", (e) => {
      xTo(0);
      yTo(0);
    });
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};