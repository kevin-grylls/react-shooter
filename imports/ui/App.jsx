import React, { useEffect, useState } from "react";

const Target = ({ x, y, size = 100 }) => {
  x = x * (size / 100);
  y = y * (size / 100);

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

export const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let isPointerLocked = false;

    window.addEventListener("click", () => {
      if (!isPointerLocked) {
        document.body.requestPointerLock();
      }
    });

    document.addEventListener("pointerlockchange", () => {
      isPointerLocked = document.pointerLockElement === document.body;
    });

    window.addEventListener("mousemove", (evt) => {
      if (isPointerLocked) {
        setPos((prevState) => {
          const { x, y } = prevState;

          return {
            x: x + evt.movementX,
            y: y + evt.movementY,
          };
        });
      }
    });
  }, []);

  return (
    <>
      <div className="crosshair" />
      <Target x={300 - pos.x} y={300 - pos.y} size={100} />
      <Target x={500 - pos.x} y={300 - pos.y} size={150} />
      <Target x={500 - pos.x} y={500 - pos.y} size={200} />
      <Target x={300 - pos.x} y={500 - pos.y} size={250} />
    </>
  );
};
