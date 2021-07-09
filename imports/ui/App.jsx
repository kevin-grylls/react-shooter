import React, { useEffect, useState } from "react";
import { Target } from "./Target";
import _ from "lodash";

export const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState([
    { _id: 2, x: 300, y: 300, size: 100 },
    { _id: 3, x: 500, y: 300, size: 150 },
    { _id: 1, x: 500, y: 500, size: 200 },
    { _id: 4, x: 300, y: 500, size: 300 },
  ]);

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
      {_.map(targets, (target) => {
        return (
          <Target
            onClick={(_id) => {
              const i = _.findIndex(targets, { _id });
              const postTarget = targets.slice(0);
              postTarget.splice(i, 1);
              setTargets(postTarget);
            }}
            key={target._id}
            _id={target._id}
            x={target.x - pos.x}
            y={target.y - pos.y}
            size={target.size}
          />
        );
      })}
    </>
  );
};
