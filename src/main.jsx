import { SlideProvider } from "./utils/Context";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SmoothScrollProvider from "./utils/SmoothScrollProvider";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SmoothScrollProvider>
      <SlideProvider>
        <App />
      </SlideProvider>
    </SmoothScrollProvider>
  </BrowserRouter>
);
