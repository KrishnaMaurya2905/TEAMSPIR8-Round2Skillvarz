import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./component/LandingPage";
import Description from "./component/Description";
import About from "./component/About";
import CursorLabel from "./component/CursorLabel";
import Navbar from "./component/Navbar";
import SignIn from "./component/SignIn";

const App = () => {
  const location = useLocation();

  return (
    <div className="w-full relative bg-black">
      <Navbar />
       <SignIn />
      <CursorLabel />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore/:id" element={<Description />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
