import React from "react";

const Slide = React.memo(
  React.forwardRef(({ image, innerRef }, ref) => {
    return (
      <div
        ref={ref}
        className="slide absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        <img
          ref={innerRef}
          src={image}
          alt="slide"
          className="w-full h-full object-cover"
        />
      </div>
    );
  })
);

export default Slide;
