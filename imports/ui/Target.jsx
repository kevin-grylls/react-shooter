import React, { useCallback, useEffect } from "react";

export const Target = ({ _id, x, y, size = 100, onClick }) => {
  x = x * (size / 100);
  y = y * (size / 100);

  const handleClick = useCallback(
    (evt) => {
      let wx = window.innerWidth / 2,
        wy = window.innerHeight / 2;

      let r = size / 2;
      let cx = x + r,
        cy = y + r;
      let d = Math.sqrt(Math.pow(cx - wx, 2) + Math.pow(cy - wy, 2));

      if (d <= r) {
        onClick(_id);
      }
    },
    [x, y],
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div
      className="target"
      style={{
        zIndex: size,
        width: size,
        height: size,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    />
  );
};
