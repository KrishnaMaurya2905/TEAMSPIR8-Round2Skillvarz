import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Observer from "gsap/Observer";
import Slide from "./Slide";
import Sidebar from "./Sidebar";
import data from "../utils/data";
import Category from "./Category";
gsap.registerPlugin(Observer);
import { useSlide } from "../utils/Context";

const NEXT = 1;
const PREV = -1;

const Slideshow = () => {
  const slidesRef = useRef([]);
  const innerRef = useRef([]);
  const textRef = useRef(null);
  const { showSidebar, setCursorLabel } = useSlide();

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (next, direction) => {
      if (isAnimating || next === current) return;

      const currentSlide = slidesRef.current[current];
      const currentInner = innerRef.current[current];
      const upcomingSlide = slidesRef.current[next];
      const upcomingInner = innerRef.current[next];

      setIsAnimating(true);

      gsap
        .timeline({
          defaults: { duration: 1.25, ease: "power4.inOut" },
          onStart: () => {
            upcomingSlide.classList.add("slide--current");
            gsap.set(upcomingSlide, {
              zIndex: 3,
              willChange: "transform, opacity",
            });
            gsap.set(currentSlide, { willChange: "transform, opacity" });
          },
          onComplete: () => {
            currentSlide.classList.remove("slide--current");
            gsap.set(upcomingSlide, { zIndex: 1 });
            gsap.set([upcomingSlide, currentSlide], {
              clearProps: "willChange",
            });
            setCurrent(next);
            setIsAnimating(false);
          },
        })
        .addLabel("start", 0)
        .to(
          currentSlide,
          {
            duration: 0.4,
            ease: "sine",
            scale: 0.9,
            autoAlpha: 0.2,
          },
          "start"
        )
        .to(
          currentSlide,
          {
            yPercent: -direction * 20,
            autoAlpha: 0,
          },
          "start+=0.1"
        )
        .fromTo(
          upcomingSlide,
          {
            autoAlpha: 0,
            scale: 1,
            yPercent: direction * 100,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
          },
          "start+=0.1"
        )
        .fromTo(
          upcomingInner,
          {
            yPercent: -direction * 50,
          },
          {
            yPercent: 0,
          },
          "start+=0.1"
        );
    },
    [current, isAnimating]
  );

  const navigate = useCallback(
    (direction) => {
      const total = slidesRef.current.length;
      const next =
        direction === NEXT
          ? current < total - 1
            ? current + 1
            : 0
          : current > 0
          ? current - 1
          : total - 1;

      goToSlide(next, direction);
    },
    [current, goToSlide]
  );

  useEffect(() => {
    slidesRef.current.forEach((slide) => {
      slide.classList.remove("slide--current");
      gsap.set(slide, { autoAlpha: 0 });
    });

    const currentSlide = slidesRef.current[current];
    if (currentSlide) {
      currentSlide.classList.add("slide--current");
      gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
    }

    const scrollObserver = Observer.create({
      type: "wheel,touch",
      onDown: () => navigate(PREV),
      onUp: () => navigate(NEXT),
      wheelSpeed: -1,
      tolerance: 10,
      normalizeScroll: true,
    });

    return () => scrollObserver.kill();
  }, [current, navigate]);

  useEffect(() => {
    if (textRef.current) {
      const textItems = textRef.current.querySelectorAll("h1");

      gsap.fromTo(
        textItems,
        {
          opacity: 0,
          rotateX: -90,
          y: 90,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.2,
        }
      );
    }
  }, [current]);

  useEffect(() => {
    if (showSidebar) {
      // If sidebar is shown, animate the textRef and Category component into view
      gsap.to([textRef.current, document.querySelector(".category-wrapper")], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.3,
      });
    } else {
      // If sidebar is hidden, fade them out
      gsap.to([textRef.current, document.querySelector(".category-wrapper")], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power4.inOut",
        stagger: 0.3,
      });
    }
  }, [showSidebar]);

  return (
    <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
      <div
        onMouseEnter={() => {
          setCursorLabel("Scroll");
        }}
        onMouseLeave={() => {
          setCursorLabel("");
        }}
        className="slides h-full w-full relative"
      >
        {data.map((img, i) => (
          <Slide
            key={i}
            image={img.img}
            ref={(el) => (slidesRef.current[i] = el)}
            innerRef={(el) => (innerRef.current[i] = el)}
          />
        ))}
      </div>

      <div
        ref={textRef}
        className="absolute text-wrapper top-[80%] left-10 -translate-y-1/2 z-[5] w-[60%]  overflow-hidden uppercase max-md:left-5 text-white max-md:top-[70%]"
      >
        <h1 className="font-['poppins'] text-lg max-md:text-sm">
          {data[current].textData.sub}
        </h1>
        <h1>{data[current].textData.head}</h1>
      </div>
      <Category
        current={current}
        goToSlide={goToSlide}
        showSidebar={showSidebar}
      />
      <Sidebar setCursorLabel={setCursorLabel} current={current} />
    </div>
  );
};

export default Slideshow;
