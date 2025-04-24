import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

const SmoothScrollProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Scroll to top on route change
    const unsubscribe = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    return () => {
      unsubscribe();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Scroll to top with Lenis on route change
    const lenis = new Lenis();
    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScrollProvider;
