// // // import React, { useEffect, useRef, useState } from "react";
// // // import gsap from "gsap";
// // // import Observer from "gsap/Observer";
// // // import Slide from "./Slide";

// // // gsap.registerPlugin(Observer);

// // // const NEXT = 1;
// // // const PREV = -1;
// // // const images = [
// // //   "/1.avif",
// // //   "/2.avif",
// // //   "/3.avif",
// // //   "/4.avif",
// // //   "/5.avif",
// // //   "/6.avif",
// // // ];
// // // const Slideshow = () => {
// // //   const slidesRef = useRef([]);
// // //   const innerRef = useRef([]);
// // //   const [current, setCurrent] = useState(0);
// // //   const [isAnimating, setIsAnimating] = useState(false);

// // //   const navigate = (direction) => {
// // //     if (isAnimating) return;

// // //     const total = slidesRef.current.length;
// // //     const prev = current;
// // //     const next =
// // //       direction === NEXT
// // //         ? (current + 1) % total
// // //         : (current - 1 + total) % total;

// // //     const currentSlide = slidesRef.current[prev];
// // //     const currentInner = innerRef.current[prev];
// // //     const upcomingSlide = slidesRef.current[next];
// // //     const upcomingInner = innerRef.current[next];

// // //     // Reset all zIndex and opacity
// // //     slidesRef.current.forEach((slide, idx) => {
// // //       if (slide) {
// // //         slide.style.zIndex = idx === prev ? 2 : 0;
// // //         slide.style.opacity = idx === prev ? 1 : 0;
// // //       }
// // //     });

// // //     // Make next slide visible under current
// // //     upcomingSlide.style.zIndex = 1;
// // //     upcomingSlide.style.opacity = 1;

// // //     setIsAnimating(true);

// // //     gsap
// // //       .timeline({
// // //         defaults: { duration: 1.2, ease: "power4.inOut" },
// // //         onStart: () => {
// // //           upcomingSlide.classList.add("slide--current");
// // //         },
// // //         onComplete: () => {
// // //           currentSlide.classList.remove("slide--current");
// // //           currentSlide.style.opacity = 0;
// // //           setCurrent(next);
// // //           setIsAnimating(false);
// // //         },
// // //       })
// // //       .addLabel("start", 0)
// // //       .to(currentSlide, { yPercent: -direction * 100 }, "start")
// // //       .to(currentInner, { yPercent: direction }, "start")
// // //       .fromTo(
// // //         upcomingSlide,
// // //         { yPercent: direction * 100 },
// // //         { yPercent: 0 },
// // //         "start"
// // //       )
// // //       .fromTo(
// // //         upcomingInner,
// // //         { yPercent: -direction },
// // //         { yPercent: 0 },
// // //         "start"
// // //       );
// // //   };

// // //   useEffect(() => {
// // //     slidesRef.current.forEach((slide, index) => {
// // //       if (slide) {
// // //         slide.classList.remove("slide--current");
// // //         slide.style.opacity = 0;
// // //       }
// // //     });

// // //     const currentSlide = slidesRef.current[current];
// // //     if (currentSlide) {
// // //       currentSlide.classList.add("slide--current");
// // //       currentSlide.style.opacity = 1;
// // //       currentSlide.style.zIndex = 2;
// // //     }

// // //     Observer.create({
// // //       type: "wheel",
// // //       onDown: () => navigate(PREV),
// // //       onUp: () => navigate(NEXT),
// // //       wheelSpeed: -1,
// // //       tolerance: 10,
// // //     });

// // //     return () => Observer.getAll().forEach((o) => o.kill());
// // //   }, [current]);

// // //   return (
// // //     <div className="slideshow-wrapper h-[70vh] w-[70%] relative overflow-hidden">
// // //       <div className="slides h-full w-full relative">
// // //         {images.map((img, index) => (
// // //           <Slide
// // //             key={index}
// // //             image={img}
// // //             ref={(el) => (slidesRef.current[index] = el)}
// // //             innerRef={(el) => (innerRef.current[index] = el)}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Slideshow;

// // import React, { useEffect, useRef, useState, useCallback } from "react";
// // import gsap from "gsap";
// // import Observer from "gsap/Observer";
// // import Slide from "./Slide";
// // import data from "../utils/data";
// // gsap.registerPlugin(Observer);

// // const NEXT = 1;
// // const PREV = -1;

// // const Slideshow = () => {
// //   const slidesRef = useRef([]);
// //   const innerRef = useRef([]);
// //   const [current, setCurrent] = useState(0);
// //   const [isAnimating, setIsAnimating] = useState(false);

// //   const navigate = useCallback(
// //     (direction) => {
// //       if (isAnimating) return;

// //       const total = slidesRef.current.length;
// //       const prev = current;
// //       const next =
// //         direction === NEXT
// //           ? (current + 1) % total
// //           : (current - 1 + total) % total;

// //       const currentSlide = slidesRef.current[prev];
// //       const currentInner = innerRef.current[prev];
// //       const upcomingSlide = slidesRef.current[next];
// //       const upcomingInner = innerRef.current[next];

// //       // Reset zIndex for all slides
// //       slidesRef.current.forEach((slide, idx) => {
// //         if (slide) {
// //           slide.style.zIndex = idx === prev ? 2 : 0;
// //         }
// //       });

// //       // Prepare the upcoming slide under the current one
// //       upcomingSlide.style.zIndex = 1;

// //       setIsAnimating(true);

// //       gsap
// //         .timeline({
// //           defaults: { duration: 1.2, ease: "power4.inOut" },
// //           onStart: () => {
// //             upcomingSlide.classList.add("slide--current");
// //           },
// //           onComplete: () => {
// //             // Reset and finalize the transition
// //             currentSlide.classList.remove("slide--current");
// //             setCurrent(next);
// //             setIsAnimating(false);
// //           },
// //         })
// //         .addLabel("start", 0)
// //         .to(currentSlide, { yPercent: -direction * 100 }, "start")
// //         .to(currentInner, { yPercent: direction }, "start")
// //         .fromTo(
// //           upcomingSlide,
// //           { yPercent: direction * 100 },
// //           { yPercent: 0 },
// //           "start"
// //         )
// //         .fromTo(
// //           upcomingInner,
// //           { yPercent: -direction },
// //           { yPercent: 0 },
// //           "start"
// //         );
// //     },
// //     [current, isAnimating] // Dependency array to avoid unnecessary re-creation of navigate function
// //   );

// //   useEffect(() => {
// //     slidesRef.current.forEach((slide, index) => {
// //       if (slide) {
// //         slide.classList.remove("slide--current");
// //       }
// //     });

// //     const currentSlide = slidesRef.current[current];
// //     if (currentSlide) {
// //       currentSlide.classList.add("slide--current");
// //       currentSlide.style.zIndex = 2;
// //     }

// //     const scrollObserver = Observer.create({
// //       type: "wheel",
// //       onDown: () => navigate(PREV),
// //       onUp: () => navigate(NEXT),
// //       wheelSpeed: -1,
// //       tolerance: 5,
// //       normalizeScroll: true, // Normalizes wheel event for better performance
// //     });

// //     return () => {
// //       scrollObserver.kill();
// //     };
// //   }, [current, navigate]); // Adding `navigate` as a dependency to ensure it's up-to-date

// //   return (
// //     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
// //       <div className="slides h-full w-full relative">
// //         {data.map((img, index) => (
// //           <Slide
// //             key={index}
// //             image={img}
// //             ref={(el) => (slidesRef.current[index] = el)}
// //             innerRef={(el) => (innerRef.current[index] = el)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Slideshow;

// // // 04

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import data from "../utils/data";
// import { Link } from "react-router-dom";
// gsap.registerPlugin(Observer);
// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const navigate = useCallback(
//     (direction) => {
//       if (isAnimating) return;

//       const total = slidesRef.current.length;
//       const previous = current;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       const currentSlide = slidesRef.current[previous];
//       const currentInner = innerRef.current[previous];
//       const upcomingSlide = slidesRef.current[next];
//       const upcomingInner = innerRef.current[next];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.25, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 3 });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             setCurrent(next);
//             setIsAnimating(false);
//           },
//         })
//         .addLabel("start", 0)
//         .to(
//           currentSlide,
//           {
//             duration: 0.4,
//             ease: "sine",
//             scale: 0.9,
//             autoAlpha: 0.2,
//           },
//           "start"
//         )
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 1,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         );
//     },
//     [current, isAnimating]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide, i) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 10,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
//       <div className="slides h-full w-full relative">
//         {data.map((img, i) => (
//           <Link key={i} to={`/work/${i}`}>
//             <Slide
//               image={img}
//               ref={(el) => (slidesRef.current[i] = el)}
//               innerRef={(el) => (innerRef.current[i] = el)}
//             />
//           </Link>
//         ))}
//       </div>

//        // show this sidebar on
//       <div className="absolute z-[4] top-1/2 -translate-y-1/2 right-10 flex w-[6.5%] h-[100vh] overflow-scroll flex-col gap-3 justify-center">
//         {data.map((item, index) => {
//           const isActive = index === current;
//           return (
//             <div
//               key={index}
//               className={`relative h-[10%] w-full flex-shrink-0  transition-all duration-300 ${
//                 isActive ? "p-[5px]" : ""
//               }`}
//             >
//               <img src={item} className="h-full w-full object-cover" />
//               {isActive && (
//                 <>
//                   <div className="absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] border-[#ffffffa9]" />
//                   <div className="absolute top-0 right-0 w-2 h-2 border-t-[1px] border-r-[1px] border-[#ffffffa9]" />
//                   <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1px] border-l-[1px] border-[#ffffffa9]" />
//                   <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1px] border-r-[1px] border-[#ffffffa9]" />
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Slideshow;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import data from "../utils/data";
// import { Link } from "react-router-dom";
// import { useSlide } from "../utils/Context";
// gsap.registerPlugin(Observer);
// import Border from "./Border";

// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const { showSidebar } = useSlide();
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const sidebarRef = useRef(null);
//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const navigate = useCallback(
//     (direction) => {
//       if (isAnimating) return;

//       const total = slidesRef.current.length;
//       const previous = current;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       const currentSlide = slidesRef.current[previous];
//       const currentInner = innerRef.current[previous];
//       const upcomingSlide = slidesRef.current[next];
//       const upcomingInner = innerRef.current[next];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.25, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 3 });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             setCurrent(next);
//             setIsAnimating(false);
//           },
//         })
//         .addLabel("start", 0)
//         .to(
//           currentSlide,
//           {
//             duration: 0.4,
//             ease: "sine",
//             scale: 0.9,
//             autoAlpha: 0.2,
//           },
//           "start"
//         )
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 1,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         );
//     },
//     [current, isAnimating]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel,touch",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 5,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   // Animate sidebar in/out
//   useEffect(() => {
//     if (sidebarRef.current) {
//       gsap.to(sidebarRef.current, {
//         top: showSidebar ? "0%" : "100%",
//         duration: 1,
//         ease: "power4.out",
//         overwrite: "auto",
//       });
//     }
//   }, [showSidebar]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
//       <div className="slides h-full w-full relative">
//         {data.map((img, i) => (
//           <Slide
//             key={i}
//             image={img}
//             ref={(el) => (slidesRef.current[i] = el)}
//             innerRef={(el) => (innerRef.current[i] = el)}
//           />
//         ))}
//       </div>

//       <div
//         ref={sidebarRef}
//         className="absolute z-[4] top-[100%] right-10 flex w-[8%] h-[100vh] overflow-scroll flex-col gap-3 justify-center max-sm:right-2 max-sm:w-[20%]"
//       >
//         {data.map((item, index) => {
//           const isActive = index === current;
//           return (
//             <Link
//               key={index}
//               to={`/work/${index}`}
//               className={`relative h-[11%] max-sm:h-[8%] w-full flex-shrink-0 transition-all duration-300 ${
//                 isActive ? "p-[5px]" : ""
//               }`}
//             >
//               <img src={item} className="h-full w-full object-cover" />
//               {isActive && <Border />}
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Slideshow;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import data from "../utils/data";
// import Sidebar from "./Sidebar"; // 👈 NEW
// gsap.registerPlugin(Observer);

// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const navigate = useCallback(
//     (direction) => {
//       if (isAnimating) return;

//       const total = slidesRef.current.length;
//       const previous = current;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       const currentSlide = slidesRef.current[previous];
//       const currentInner = innerRef.current[previous];
//       const upcomingSlide = slidesRef.current[next];
//       const upcomingInner = innerRef.current[next];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.25, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 3 });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             setCurrent(next);
//             setIsAnimating(false);
//           },
//         })
//         .addLabel("start", 0)
//         .to(
//           currentSlide,
//           {
//             duration: 0.4,
//             ease: "sine",
//             scale: 0.9,
//             autoAlpha: 0.2,
//           },
//           "start"
//         )
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 1,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         );
//     },
//     [current, isAnimating]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel, touch",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 10,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
//       <div className="slides h-full w-full relative">
//         {data.map((img, i) => (
//           <Slide
//             key={i}
//             image={img}
//             ref={(el) => (slidesRef.current[i] = el)}
//             innerRef={(el) => (innerRef.current[i] = el)}
//           />
//         ))}
//         <div className="absolute top-[80%] -translate-y-1/2 left-[25%] -translate-x-1/2 bg-red-500 z-[5] h-[10vh] overflow-hidden w-[20%] ">
//           {Array.from({ length: data.length }).map((it, idx) => {
//             return (
//               <>
//                 <h1 className="font-['roboto'] text-lg">NEDBANK</h1>
//                 <h1>KE YONA, YA RONA</h1>
//               </>
//             );
//           })}
//         </div>
//       </div>

//       <Sidebar current={current} />
//     </div>
//   );
// };

// export default Slideshow;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import data from "../utils/data";
// import Sidebar from "./Sidebar";

// gsap.registerPlugin(Observer);

// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const textRef = useRef(null);

//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const navigate = useCallback(
//     (direction) => {
//       if (isAnimating) return;

//       const total = slidesRef.current.length;
//       const previous = current;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       const currentSlide = slidesRef.current[previous];
//       const currentInner = innerRef.current[previous];
//       const upcomingSlide = slidesRef.current[next];
//       const upcomingInner = innerRef.current[next];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.25, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 3 });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             setCurrent(next);
//             setIsAnimating(false);
//           },
//         })
//         .addLabel("start", 0)
//         .to(
//           currentSlide,
//           {
//             duration: 0.4,
//             ease: "sine",
//             scale: 0.9,
//             autoAlpha: 0.2,
//           },
//           "start"
//         )
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 1,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         );
//     },
//     [current, isAnimating]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel, touch",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 10,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   useEffect(() => {
//     if (textRef.current) {
//       const textItems = textRef.current.querySelectorAll("h1");

//       gsap.fromTo(
//         textItems,
//         {
//           opacity: 0,
//           rotateX: -90,
//           y: 90,
//           transformOrigin: "top center",
//         },
//         {
//           opacity: 1,
//           rotateX: 0,
//           y: 0,
//           duration: 1.1,
//           ease: "power4.out",
//           stagger: 0.2,
//         }
//       );
//     }
//   }, [current]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden ">
//       <div className="slides   h-full w-full relative">
//         {data.map((img, i) => (
//           <Slide
//             key={i}
//             image={img.img}
//             ref={(el) => (slidesRef.current[i] = el)}
//             innerRef={(el) => (innerRef.current[i] = el)}
//           />
//         ))}
//       </div>
//       <div
//         ref={textRef}
//         className="absolute text-wrapper top-[80%] left-10  -translate-y-1/2 z-[5] w-[40%]  overflow-hidden uppercase text-white max-md:top-1/2 "
//       >
//         <h1 className="font-['poppins'] text-lg max-md:text-sm">
//           {data[current].textData.sub}
//         </h1>
//         <h1 className="">{data[current].textData.head}</h1>
//       </div>
//       <Category setCurrent={setCurrent} />
//       <Sidebar current={current} />
//     </div>
//   );
// };

// export default Slideshow;

// const Category = ({ setCurrent }) => {
//   const categoryData = [
//     {
//       name: "K-Drama",
//       items: 3,
//       firstItem: 1,
//     },
//     {
//       name: "TV Shows",
//       items: 4,
//       firstItem: 4,
//     },
//     {
//       name: "Movies",
//       items: 4,
//       firstItem: 8,
//     },
//     {
//       name: "Web Series",
//       items: 2,
//       firstItem: 10,
//     },
//   ];

//   return (
//     <div className="absolute z-[4] top-[40%] -translate-y-1/2 left-10 h-fit w-fit text-[2rem] leading-none uppercase font-black text-white space-y-3">
//       {categoryData.map((item, index) => (
//         <h3
//           key={index}
//           onClick={() => setCurrent(item.firstItem)}
//           className="cursor-pointer flex items-start gap-1"
//         >
//           {item.name}
//           <span className="text-xs  align-super">[ {item.items} ]</span>
//         </h3>
//       ))}
//     </div>
//   );
// };

// const Category = ({ setCurrent }) => {
//   const categoryData = [
//     {
//       name: "K-Drama",
//       items: 3,
//       firstItem: 4,
//     },
//     {
//       name: "TV Shows",
//       items: 4,
//       firstItem: 5,
//     },
//     {
//       name: "Movies",
//       items: 4,
//       firstItem: 2,
//     },
//     {
//       name: "Web Series",
//       items: 2,
//       firstItem: 6,
//     },
//   ];
//   return (
//     <div className="absolute z-[4] top-[40%] -translate-y-1/2 left-10 h-fit w-fit text-2xl leading-none uppercase ">
//       {categoryData.map((item, index) => {
//         return (
//           <h3 onClick={() => setCurrent(8)}>
//             {item.name}[{item.items}]
//           </h3>
//         );
//       })}
//     </div>
//   );
// };

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import Sidebar from "./Sidebar";
// import data from "../utils/data";
// import Category from "./Category";
// gsap.registerPlugin(Observer);

// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const textRef = useRef(null);

//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // First declare goToSlide to avoid ReferenceError
//   const goToSlide = useCallback(
//     (targetIndex) => {
//       if (isAnimating || targetIndex === current) return;

//       const direction = targetIndex > current ? NEXT : PREV;
//       const currentSlide = slidesRef.current[current];
//       const currentInner = innerRef.current[current];
//       const upcomingSlide = slidesRef.current[targetIndex];
//       const upcomingInner = innerRef.current[targetIndex];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.2, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, {
//               zIndex: 3,
//               willChange: "transform, opacity",
//             });
//             gsap.set(currentSlide, { willChange: "transform, opacity" });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             gsap.set([upcomingSlide, currentSlide], {
//               clearProps: "willChange",
//             });
//             setCurrent(targetIndex);
//             setIsAnimating(false);
//           },
//         })
//         .to(currentSlide, {
//           scale: 0.9,
//           autoAlpha: 0.2,
//           duration: 0.4,
//         })
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "<"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 0,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             autoAlpha: 1,
//             yPercent: 0,
//           },
//           "<0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "<"
//         );
//     },
//     [current, isAnimating]
//   );

//   const navigate = useCallback(
//     (direction) => {
//       const total = slidesRef.current.length;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       goToSlide(next);
//     },
//     [current, goToSlide]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel,touch",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 20,
//       preventDefault: true,
//       allowClicks: true,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   useEffect(() => {
//     if (textRef.current) {
//       const textItems = textRef.current.querySelectorAll("h1");

//       gsap.fromTo(
//         textItems,
//         {
//           opacity: 0,
//           rotateX: -90,
//           y: 90,
//           transformOrigin: "top center",
//         },
//         {
//           opacity: 1,
//           rotateX: 0,
//           y: 0,
//           duration: 1.1,
//           ease: "power4.out",
//           stagger: 0.2,
//         }
//       );
//     }
//   }, [current]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
//       <div className="slides h-full w-full relative">
//         {data.map((img, i) => (
//           <Slide
//             key={i}
//             image={img.img}
//             ref={(el) => (slidesRef.current[i] = el)}
//             innerRef={(el) => (innerRef.current[i] = el)}
//           />
//         ))}
//       </div>

//       <div
//         ref={textRef}
//         className="absolute text-wrapper top-[80%] left-10 -translate-y-1/2 z-[5] w-[40%] overflow-hidden uppercase text-white max-md:top-1/2"
//       >
//         <h1 className="font-['poppins'] text-lg max-md:text-sm">
//           {data[current].textData.sub}
//         </h1>
//         <h1>{data[current].textData.head}</h1>
//       </div>
//       <Category goToSlide={goToSlide} />
//       <Sidebar current={current} />
//     </div>
//   );
// };

// export default Slideshow;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import Observer from "gsap/Observer";
// import Slide from "./Slide";
// import Sidebar from "./Sidebar";
// import data from "../utils/data";
// import Category from "./Category";
// gsap.registerPlugin(Observer);
// import { useSlide } from "../utils/Context";

// const NEXT = 1;
// const PREV = -1;

// const Slideshow = () => {
//   const slidesRef = useRef([]);
//   const innerRef = useRef([]);
//   const textRef = useRef(null);
//   const { showSidebar } = useSlide();

//   const [current, setCurrent] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const goToSlide = useCallback(
//     (next, direction) => {
//       if (isAnimating || next === current) return;

//       const currentSlide = slidesRef.current[current];
//       const currentInner = innerRef.current[current];
//       const upcomingSlide = slidesRef.current[next];
//       const upcomingInner = innerRef.current[next];

//       setIsAnimating(true);

//       gsap
//         .timeline({
//           defaults: { duration: 1.25, ease: "power4.inOut" },
//           onStart: () => {
//             upcomingSlide.classList.add("slide--current");
//             gsap.set(upcomingSlide, {
//               zIndex: 3,
//               willChange: "transform, opacity",
//             });
//             gsap.set(currentSlide, { willChange: "transform, opacity" });
//           },
//           onComplete: () => {
//             currentSlide.classList.remove("slide--current");
//             gsap.set(upcomingSlide, { zIndex: 1 });
//             gsap.set([upcomingSlide, currentSlide], {
//               clearProps: "willChange",
//             });
//             setCurrent(next);
//             setIsAnimating(false);
//           },
//         })
//         .addLabel("start", 0)
//         .to(
//           currentSlide,
//           {
//             duration: 0.4,
//             ease: "sine",
//             scale: 0.9,
//             autoAlpha: 0.2,
//           },
//           "start"
//         )
//         .to(
//           currentSlide,
//           {
//             yPercent: -direction * 20,
//             autoAlpha: 0,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingSlide,
//           {
//             autoAlpha: 0,
//             scale: 1,
//             yPercent: direction * 100,
//           },
//           {
//             yPercent: 0,
//             autoAlpha: 1,
//           },
//           "start+=0.1"
//         )
//         .fromTo(
//           upcomingInner,
//           {
//             yPercent: -direction * 50,
//           },
//           {
//             yPercent: 0,
//           },
//           "start+=0.1"
//         );
//     },
//     [current, isAnimating]
//   );

//   const navigate = useCallback(
//     (direction) => {
//       const total = slidesRef.current.length;
//       const next =
//         direction === NEXT
//           ? current < total - 1
//             ? current + 1
//             : 0
//           : current > 0
//           ? current - 1
//           : total - 1;

//       goToSlide(next, direction);
//     },
//     [current, goToSlide]
//   );

//   useEffect(() => {
//     slidesRef.current.forEach((slide) => {
//       slide.classList.remove("slide--current");
//       gsap.set(slide, { autoAlpha: 0 });
//     });

//     const currentSlide = slidesRef.current[current];
//     if (currentSlide) {
//       currentSlide.classList.add("slide--current");
//       gsap.set(currentSlide, { autoAlpha: 1, zIndex: 2 });
//     }

//     const scrollObserver = Observer.create({
//       type: "wheel,touch",
//       onDown: () => navigate(PREV),
//       onUp: () => navigate(NEXT),
//       wheelSpeed: -1,
//       tolerance: 10,
//       normalizeScroll: true,
//     });

//     return () => scrollObserver.kill();
//   }, [current, navigate]);

//   useEffect(() => {
//     if (textRef.current) {
//       const textItems = textRef.current.querySelectorAll("h1");

//       gsap.fromTo(
//         textItems,
//         {
//           opacity: 0,
//           rotateX: -90,
//           y: 90,
//           transformOrigin: "top center",
//         },
//         {
//           opacity: 1,
//           rotateX: 0,
//           y: 0,
//           duration: 1.1,
//           ease: "power4.out",
//           stagger: 0.2,
//         }
//       );
//     }
//   }, [current]);

//   return (
//     <div className="slideshow-wrapper h-[100vh] w-[100%] relative overflow-hidden">
//       <div className="slides h-full w-full relative">
//         {data.map((img, i) => (
//           <Slide
//             key={i}
//             image={img.img}
//             ref={(el) => (slidesRef.current[i] = el)}
//             innerRef={(el) => (innerRef.current[i] = el)}
//           />
//         ))}
//       </div>

//       <div
//         ref={textRef}
//         className="absolute text-wrapper top-[80%] left-10 -translate-y-1/2 z-[5] w-[40%] overflow-hidden uppercase text-white max-md:top-1/2"
//       >
//         <h1 className="font-['poppins'] text-lg max-md:text-sm">
//           {data[current].textData.sub}
//         </h1>
//         <h1>{data[current].textData.head}</h1>
//       </div>
//       <Category current={current} goToSlide={goToSlide} />
//       <Sidebar current={current} />
//     </div>
//   );
// };

// export default Slideshow;

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
  const sidebarRef = useRef(null);

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
      onDown: (e) => {
        if (sidebarRef.current?.matches(':hover')) return;
        navigate(PREV);
      },
      onUp: (e) => {
        if (sidebarRef.current?.matches(':hover')) return;
        navigate(NEXT);
      },
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
        className="absolute text-wrapper top-[80%] left-10 -translate-y-1/2 z-[5] w-[40%] overflow-hidden uppercase text-white max-md:top-1/2"
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
    <Sidebar
  setCursorLabel={setCursorLabel}
  current={current}
  sidebarRef={sidebarRef}
/>

    </div>
  );
};

export default Slideshow;
