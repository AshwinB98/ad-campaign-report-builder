import { useLayoutEffect, useState } from "react";

const useContainerDimensions = (containerRef) => {
  const [containerWidth, setContainerWidth] = useState(1200);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [containerRef]);

  return containerWidth;
};

export default useContainerDimensions;
