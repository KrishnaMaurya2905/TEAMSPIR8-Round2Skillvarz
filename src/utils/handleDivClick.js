// utils/handleDivClick.js

const handleDivClick = (e, itemOrIndex, indexOrNavigate, maybeNavigate , id ) => {
  e.preventDefault();

  let index, navigate;

  // Determine the arguments
  if (typeof indexOrNavigate === "number") {
    index = indexOrNavigate;
    navigate = maybeNavigate;
  } else {
    index = itemOrIndex;
    navigate = indexOrNavigate;
  }

  const target = e.currentTarget;
  const img = target.querySelector("img");

  if (!img) return;

  const rect = img.getBoundingClientRect();

  // Create black overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "black";
  overlay.style.opacity = "0";
  overlay.style.zIndex = 999;
  overlay.style.transition = "opacity 0.5s ease-in-out";
  document.body.appendChild(overlay);
  void overlay.offsetWidth; // force reflow
  overlay.style.opacity = "1";

  // Clone and animate image
  const clone = img.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.top = `${rect.top}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = 1000;
  clone.style.objectFit = "cover";
  clone.style.transition = "all 1s cubic-bezier(0.77, 0, 0.175, 1)";
  document.body.appendChild(clone);

  // Lock scroll
  document.body.style.overflow = "hidden";

  // Move to center then fullscreen
  const centerX = window.innerWidth / 2 - rect.width / 2;
  const centerY = window.innerHeight / 2 - rect.height / 2;

  requestAnimationFrame(() => {
    clone.style.top = `${centerY}px`;
    clone.style.left = `${centerX}px`;
  });

  setTimeout(() => {
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.width = "100vw";
    clone.style.height = "100vh";
  }, 1000);

  // Cleanup and navigate
  setTimeout(() => {
    if (navigate) {
      navigate(`/explore/${id}`);
    }
   setTimeout(() => {
      overlay.remove();
      clone.remove();
      document.body.style.overflow = "auto";
    }, 200);

  }, 1800);
};

export default handleDivClick;
