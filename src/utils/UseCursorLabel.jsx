
import { useSlide } from "../utils/Context";

const useCursorLabel = (text) => {
  const { setCursorLabel } = useSlide();

  return {
    onMouseEnter: () => setCursorLabel(text),
    onMouseLeave: () => setCursorLabel(""),
  };
};

export default useCursorLabel;
