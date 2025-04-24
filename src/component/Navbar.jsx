import React from "react";
import { useSlide } from "../utils/Context";
const Navbar = () => {
  const { showSidebar } = useSlide();
  return (
    <div className="fixed h-[10vh] text-white font-['Seri'] text-3xl max-md:text-2xl flex items-center justify-between px-[2%] top-0 left-0 w-full  z-[10]">
      <h3>CINEVERSE</h3>
      <h3>SIGN IN</h3>
    </div>
  );
};

export default Navbar;
