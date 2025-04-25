
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [clickedImageData, setClickedImageData] = useState(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
    setClickedImageData(null);
    setCursorLabel("");

    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [location]);

  return (
    <SlideContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        clickedImageData,
        setClickedImageData,
        cursorLabel,
        setCursorLabel,
        cursorPos,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};

export const useSlide = () => useContext(SlideContext);
