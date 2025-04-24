import { useScroll, motion, useTransform , useInView } from "framer-motion";
import React, { useRef } from "react";

const About = () => {
  return (
    <div className="bg-black text-white">
      <HeroAbout />
      <AboutAbout />
      <Story />
      <Vision />
      <Collaborators />
    </div>
  );
};

export default About;

const HeroAbout = () => {
  return (
    <div className="h-screen  w-full font-[BebasNeue]">
      <div className="flex flex-col justify-end md:h-full h-[90vh] w-full  pb-5  ">
        <h1 className="md:text-8xl text-4xl   text-white">
          WHERE STORIES COME ALIVE
        </h1>
        <p className="md:text-2xl text-xl font-[Franklin] opacity-50 leading-[.9] text-white md:w-[50%]">
          CineVerse is your digital doorway to unforgettable cinematic
          experiences — anytime, anywhere.
        </p>
      </div>
    </div>
  );
};

const AboutAbout = () => {
  return (
    <div className="min-h-screen w-full mt-20 md:pt-40 pt-5 ">
      <div className=" md:h-[50vh] h-full w-full md:flex justify-between">
        <div className=" md:h-full w-[40%] mb-10">
          <h1 className="md:text-8xl text-4xl">ABOUT</h1>
        </div>
        <div className=" h-full md:w-[50%] flex flex-col gap-10 ">
          <p className="md:text-2xl text-xl md:leading-none font-[Franklin] opacity-50 leading-[.9]">
            We created CineVerse not just to stream movies, but to elevate how
            stories are told and shared. We believe in the magic of cinema, in
            moments that stick with you, in goosebumps and gasps and laughs in
            the dark.
          </p>
          <p className="md:text-2xl text-xl md:leading-none font-[Franklin] opacity-50 leading-[.9]">
            We created CineVerse not just to stream movies, but to elevate how
            stories are told and shared. We believe in the magic of cinema, in
            moments that stick with you, in goosebumps and gasps and laughs in
            the dark.
          </p>
        </div>
      </div>

      <CardAnimation />
    </div>
  );
};

const CardAnimation = () => {
  const data = [
    "https://plus.unsplash.com/premium_photo-1672329275106-073b5493c00f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1744315900478-fa44dc6a4e89?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1744484876956-d5054fcec5f5?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1744723852515-84e56b8bb04d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div
      ref={ref}
      className="min-h-screen w-full  grid grid-cols-2  md:grid-cols-4  gap-8 p-6"
    >
      {data.map((item, index) => {
        const y = useTransform(
          scrollYProgress,
          [0.3, 0.7],
          [`${90 + index * 300}px`, "0px"]
        );
        const opacity = useTransform(
          scrollYProgress,
          [0, 0.2 + index * 0.15],
          [0, 1]
        );

        return (
          <motion.div
            key={index}
            style={{ y, opacity }}
            className="md:h-[500px]  h-[300px] w-full overflow-hidden "
          >
            <motion.img
              src={item}
              alt=""
              className="h-full w-full object-cover "
            />
          </motion.div>
        );
      })}
    </div>
  );
};


function TimelineDivBar() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  return (
    <div className=" min-h-screen w-full overflow-hidden ">
      <div className="text-center md:h-[10vh] w-full">
        <h1 className="md:text-8xl text-4xl">THE STORY BEHIND CINEVERSE</h1>
      </div>

      <div ref={containerRef} className="relative  py-32 ">
        {/* Vertical Line */}
        <motion.div
          className="absolute left-1/2 top-20 xl:h-[73.5%] md:h-[78.8%] h-[67.5%]  w-[4px] bg-white/50 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Timeline Items */}
        <div className="relative flex flex-col md:gap-[10vh]  items-center z-10">
          {timeline.map((item, i) => (
            <TimelinePoint key={i} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
const timeline = [
  {
    year: "2023",
    text: "Idea sparked by indie film lovers",
    align: "right",
  },
  {
    year: "2024",
    text: "Beta launched with handpicked classics",
    align: "left",
  },
  {
    year: "2025",
    text: "Global expansion & multi-language support",
    align: "right",
  },
];

 function Story () {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  return (
   <div className=" min-h-screen w-full overflow-hidden ">
    <div className="text-center md:h-[10vh] w-full">
    <h1 className="md:text-8xl text-4xl">THE STORY BEHIND CINEVERSE</h1>
</div>

     <div ref={containerRef} className="relative  py-32 ">
      {/* Vertical Line */}
      <motion.div
        className="absolute left-1/2 top-20 xl:h-[73.5%] md:h-[78.8%] h-[67.5%]  w-[4px] bg-white/50 origin-top"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}

        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Timeline Items */}
      <div className="relative flex flex-col md:gap-[10vh]  items-center z-10">
        {timeline.map((item, i) => (
          <TimelinePoint key={i} data={item} />
        ))}
      </div>
    </div>
   </div>
  );
}

function TimelinePoint({ data }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
  
    const isLeft = data.align === "left";
  
    return (
      <div className="relative  md:h-[50vh] h-[30vh]   flex w-full items-center justify-center  ">
        {/* Horizontal Arm */}
        <motion.div
          className={`absolute h-[2px] md:w-[20%] w-[10%] bg-white/50   ${
            isLeft ? "right-1/2" : "left-1/2"
          }`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ transformOrigin: isLeft ? "right" : "left" }}
        />
  
        {/* Year & Text */}
        <motion.div
          ref={ref}
          className={`absolute top-1/2 -translate-y-1/2 px-10 md:w-[25%] w-[60%]   ${
            isLeft ? "md:right-[calc(70%)] right-[calc(40%+3rem)] text-right" : "md:left-[calc(70%)] left-[calc(40%+3rem)] text-left "
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className=" md:text-8xl text-4xl font-bold">{data.year}</h3>
          <p className="md:text-xl text-xl font-[Franklin] text-gray-500 mt-1 leading-[.9]   ">{data.text}</p>
        </motion.div>
      </div>
    );
  }
const Vision = () => {
  return (
    <div className=" md:h-[70vh] h-[50vh]  w-full flex  items-center justify-center mt-10 ">
      <div className="flex flex-col h-full gap-5 ">
        <h1 className="md:text-8xl text-4xl">OUR VISION</h1>
        <p className="md:text-4xl text-2xl md:leading-none leading-[.9] opacity-50 font-[Franklin] md:w-[70%] ">
          We aim to be more than a streaming service. Our vision is to build a
          culture — where creators and viewers connect through storytelling.
          We’re constantly evolving, and you’re part of that journey.{" "}
        </p>
      </div>
    </div>
  );
};

const Collaborators = () => {
  const collaborators = [
    { title: "In Partnership With A24" },
    { title: "Curated Netflix Originals" },
    { title: "Prime Indie Studio" },
    { title: "Global Cinema Access" },
  ];

  const stats = [
    { label: "#1 In Emerging Platforms" },
    { label: "20k+ Hours Watched" },
    { label: "Rated 4.5 / 5" },
    { label: "Built For Cinephiles" },
  ];

  return (
    <div className="w-full  py-16   space-y-30 ">
      {/* Collaborators Section */}
      <div className="space-y-16  ">
        <h2 className="md:text-8xl text-4xl font-bold text-center">
          OUR COLLABORATORS AND PARTNERS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {collaborators.map((item, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="md:w-[200px] md:h-[200px] w-[150px] h-[200px]  bg-red-500 mx-auto" />
              <p className="md:text-2xl text-xl opacity-50 font-[Franklin] leading-[.9]  ">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* More About Platform */}
      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Left Text */}
        <div className="md:w-1/2">
          <h3 className="md:text-8xl text-4xl font-bold leading-tight">
            MORE ABOUT <br /> THE PLATFORM
          </h3>
        </div>
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/5  border-t border-gray-300 rotate-90" />

        {/* Right Stats */}
        <div className="md:w-1/2 space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-6 h-6 bg-red-500" />
              <p className="md:text-2xl text-xl font-[Franklin]  tracking-tight  opacity-50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
