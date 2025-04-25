import React from "react";

const Footer = ({  currentData }) => {
  return (
    <div>
      <div
        className="relative h-[90vh]  "
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 font-['poppins'] h-[90vh] bg-white  w-full text-black overflow-hidden p-5 pt-20 uppercase  text-xl max-md:text-lg  ">
          <div className="h-[35%]  font-['Gothic'] w-full  flex max-md:flex-col justify-between max-md:gap-10  ">
            <div className="h-fit w-fit flex flex-col gap-5 max-md:w-full ">
              <h3 className="opacity-70">Contact</h3>
              <div>
                <h3>8764502281</h3>
              </div>
            </div>
            <div className="h-fit w-1/2 flex max-md:flex-wrap justify-between px-10 max-md:px-0  max-md:gap-y-10 ">
              <div className="h-fit w-fit flex flex-col gap-5 max-md:w-full">
                <h3 className="opacity-70">Support</h3>
                <div>
                  <h3>Help Center</h3>
                  <h3>Feedback</h3>
                </div>
              </div>
              <div className="h-fit w-fit flex flex-col gap-5 ">
                <h3 className="opacity-70">Menu</h3>
                <div>
                  <h3>Home</h3>
                  <h3>About</h3>
                </div>
              </div>
              <div className="h-fit w-fit flex flex-col gap-5 ">
                <h3 className="opacity-70">Social</h3>
                <div>
                  <h3>Instagram</h3>
                  <h3>Facebook</h3>
                  <h3>X</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[55%]  w-full flex flex-col  justify-end  ">
            <div className="text-black flex justify-between items-end font-['Gothic'] leading-none text-4xl max-md:text-xl h-fit w-full ">
            <h2 className="text-6xl max-md:text-3xl font-['Seri'] font-bold  ">Cinverse</h2>
            <h2 className="opacity-70" >
              Streaming Redefined for <br /> Storytellers and Seekers
            </h2>

            </div>
            <div className="relative w-full h-[20vw] overflow-hidden">
  {/* Video absolutely positioned */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    loop
    autoPlay
    muted
    playsInline
    src={currentData.video}
  />

  {/* Text mask */}

</div>

          </div>
          <div className="h-[10%] w-full flex justify-between text-xl  max-md:text-xs items-center font-['Gothic'] ">
            <h3>@2025 Cinverse</h3>
            <h3>privacy policy</h3>
            <h3>website by Team Spir8</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
