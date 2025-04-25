import { useEffect, useState } from "react";
import { useSlide } from "../utils/Context";
import { useLocation, useNavigate } from "react-router-dom";
import FlipLink from "./FlipLink";

const Navbar = ({ SetOpenSignIn }) => {
  const { showSidebar } = useSlide();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showNavbarOnScroll, setShowNavbarOnScroll] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowNavbar =
    ((location.pathname === "/" && showSidebar) || location.pathname !== "/") &&
    showNavbarOnScroll;

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowNavbarOnScroll(false);
      } else {
        // scrolling up
        setShowNavbarOnScroll(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed h-[8vh] max-md:h-[5vh] ${
        location.pathname === "/" ? "w-[90%] max-xl:w-[80%]" : "w-full"
      } max-md:w-full text-white font-['Seri'] text-3xl max-md:text-2xl max-sm:text-xl flex justify-between items-end px-[2%] top-0 left-0 z-[10] tracking-wider leading-none transition-all duration-500 ease-in-out
        ${
          shouldShowNavbar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
    >
      <h3
        onClick={() => {
          if (location.pathname !== "/") {
            navigate("/");
          }
        }}
      >
        CINEVERSE
      </h3>
      <span className="text-xs max-sm:text-[10px] align-super font-['poppins'] font-semibold">
        [ {date} ]
      </span>
      <span className="text-xs max-sm:text-[10px]  font-['poppins'] font-semibold align-super">
        [ {time} ]
      </span>
      <FlipLink
        onClick={() => {
          SetOpenSignIn((prev) => !prev);
        }}
      >
        SIGN IN
      </FlipLink>
    </div>
  );
};

export default Navbar;
