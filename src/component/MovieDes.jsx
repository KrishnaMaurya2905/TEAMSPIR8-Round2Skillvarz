import React from "react";
import Button from "./Button";
import Border from "./Border";
import AnimatedText from "./AnimatedText";
import Paragraph from "./Paragraph";

const MovieDes = ({ Name, BannerImg, info, Category, des }) => {
  return (
    <div className="h-[100vh] max-sm:h-[82vh] max-md:h-[85vh] py-[5vh] w-full px-[2%] flex flex-col items-start justify-between">
      <div className="flex items-start justify-between max-md:w-full flex-wrap w-full h-1/2">
        <div className="flex flex-col max-sm:gap-5 gap-10">
          <h1 className="text-[5vw] tracking-wider font-semibold max-sm:text-3xl uppercase leading-none font-['Seri']">
            <AnimatedText>{Name}</AnimatedText>
          </h1>

          {/* Updated image block with hover border and padding */}
          <div className="w-[30rem] max-md:w-[100%] h-[35vh] group relative">
            <div className="w-full h-full group-hover:p-2 transition-all duration-300 relative">
              <img
                className="w-full h-full object-cover"
                src={BannerImg}
                alt=""
              />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Border />
              </div>
            </div>
          </div>
        </div>

        <div className="flex font-['Gothic'] uppercase gap-8 max-sm:gap-3 max-md:text-xl max-md:min-w-fit text-2xl opacity-60 max-sm:pt-1">
          {info.map((it, idx) => (
            <h3 key={idx}>{it}</h3>
          ))}
        </div>
      </div>

      <div className="w-full max-sm:h-[35%] h-[40%] flex items-start max-md:flex-col justify-between max-sm:mt-5">
        <div className="flex text-2xl max-lg:text-xl font-['Gothic'] max-sm:text-lg flex-col gap-5 uppercase max-sm:gap-1">
          <h3>{Category}</h3>
          <div className="flex gap-2 w-fit">
            <Button
              text={"Start Watching NOW"}
              customclass={`text-xl tracking-wide mx-auto bg-white text-black border-white border-[1px]`}
              circ={`bg-black`}
              p={`group-hover:text-white `}
            />
            <Button
              text={"+"}
              customclass={`text-xl w-fit tracking-wide mx-auto bg-white text-black border-white border-[1px]`}
              circ={`bg-black`}
              p={`group-hover:text-white`}
            />
          </div>
        </div>

        <Paragraph
          className={`font-['Seri'] text-3xl max-2xl:text-2xl max-xl:text-xl max-lg:text-[18px] max-sm:text-[16px]`}
          phrases={des}
        />
      </div>
    </div>
  );
};

export default MovieDes;
