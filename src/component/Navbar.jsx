import { useEffect, useState } from "react";
import { useSlide } from "../utils/Context";
import { useLocation } from "react-router-dom";

const Navbar = ({ SetOpenSignIn }) => {
  const { showSidebar } = useSlide();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const location = useLocation();

  const shouldShowNavbar =
    (location.pathname === "/" && showSidebar) || location.pathname !== "/";

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setDate(`${day}-${month}-${year}`);
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed h-[8vh] max-md:h-[5vh] w-[90%] max-md:w-full text-white font-['Gothic'] text-3xl max-md:text-2xl flex justify-between items-end px-[2%] top-0 left-0 z-[10] tracking-wider leading-none transition-all duration-500 ease-in-out
        ${
          shouldShowNavbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
    >
      <h3>CINEVERSE</h3>
      <span className="text-xs align-super">[ {date} ]</span>
      <span className="text-xs align-super">[ {time} ]</span>
      <h3 onClick={() => SetOpenSignIn((prev) => !prev)}>SIGN IN</h3>
    </div>
  );
};

export default Navbar;
