import React, { useRef, useState } from "react";
import data from "../utils/data";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { Descriptiondata } from "../utils/data";
import handleDivClick from "../utils/handleDivClick";
import Footer from "./Footer";
import Paragraph from "./Paragraph";
import AnimatedText from "./AnimatedText";
import Button from "./Button";
import FadeInOnView from "./FadeInOnView";
import { useSlide } from "../utils/Context";
import VideoSection from "./VideoSection";
import Border from "./Border";
import MoreFeatured from "./MoreFeatured";
import MovieDes from "./MovieDes";
const NextImage = ({ image, index, navigate }) => {
  const { setCursorLabel } = useSlide();
  const [isHovered, setIsHovered] = useState(false);

  if (!image) return null;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorLabel("View");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorLabel("");
  };

  return (
    <div
      className={`w-[50%] max-md:w-full max-md:h-1/2 h-full relative cursor-pointer ${
        isHovered ? "p-2" : ""
      } transition-all duration-300`}
      onClick={(e) => handleDivClick(e, index, navigate)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && <Border height={16} width={16} />}
      <img
        className="w-full h-full object-cover"
        src={image.img}
        alt={`img-${index}`}
      />
    </div>
  );
};

const Description = () => {
  const { id } = useParams();
  const numericId = parseInt(id);
  const navigate = useNavigate();
  const { Name, info, Category, BannerImg, sliderdata, des, moreRelated } =
    Descriptiondata[id];
  const videoRef = useRef(null);

  const totalItems = data.length;
  const currentData = Descriptiondata[numericId];

  // Wraparound logic using modulo
  const nextIndex1 = (numericId + 1) % totalItems;
  const nextIndex2 = (numericId + 2) % totalItems;
  const nextImage1 = data[nextIndex1];
  const nextImage2 = data[nextIndex2];

  // Prevent invalid routes
  if (!currentData) return <div className="text-white">Invalid ID</div>;

  return (
    <div className="w-full min-h-[300vh] text-white bg-black relative">
      <VideoSection videoRef={videoRef} currentData={currentData} />

      <div className="relative z-[2] -mt-screen h-fit  w-full bg-black">
        <MovieDes
          info={info}
          des={des}
          BannerImg={BannerImg}
          Category={Category}
          Name={Name}
        />
        <div className="cursor-pointer   font-['Seri'] font-semibold text-[5.5vw] leading-none flex max-sm:text-3xl items-start gap-1">
          <AnimatedText> MEMORABLE MOMENTS</AnimatedText>
          <FadeInOnView className="text-sm align-super">[ 5 ]</FadeInOnView>
        </div>
        <Slider Sliderdata={sliderdata} />
        <MoreFeatured moreRelated={moreRelated} />
        <div className="w-full  px-[2%]    h-[80vh] max-lg:h-[50vh] max-xl:h-[60vh] py-[5%]  flex items-center max-md:h-[80vh] gap-2  max-md:flex-col  justify-between">
          <NextImage
            image={nextImage1}
            index={nextIndex1}
            navigate={navigate}
          />
          <NextImage
            image={nextImage2}
            index={nextIndex2}
            navigate={navigate}
          />
        </div>
        <div className="h-screen max-md:h-[60vh] w-full flex flex-col justify-center items-center text-center text-[5vw] max-md:text-[7vw] tracking-wider font-semibold uppercase font-['Seri'] leading-none ">
          <Paragraph
            phrases={["READY TO DISCOVER YOUR", "NEXT FAVORITE MOVIE ?"]}
          />

          <div className="flex gap-2">
            <Button
              text={"Start Watching NOW"}
              customclass={`text-lg w-fit tracking-wide mx-auto mt-[10vh] max-sm:mt-[3vh] bg-white text-black border-white border-[1px]`}
              circ={`bg-black`}
              p={`group-hover:text-white`}
            />
            <Button
              text={"+"}
              customclass={`text-lg w-fit tracking-wide mx-auto mt-[10vh] max-sm:mt-[3vh] bg-white text-black border-white border-[1px]`}
              circ={`bg-black`}
              p={`group-hover:text-white`}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Description;
