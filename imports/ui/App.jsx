import React, { useEffect, useState } from "react";
import { Transition, animated } from "react-spring";
import _ from "lodash";
import { withTracker } from "meteor/react-meteor-data";

import { Target } from "./Target";
import { GameCollection } from "../api/game.collection";
import { PlayerNameForm } from "./PlayerNameForm";
import { PlayerList } from "./PlayerList";

const AnimatedTarget = animated(Target);

export const App = (props) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    setInterval(function () {
      const gameId = props.gameId;

      if (gameId) {
        Meteor.call("game.ping", gameId);
      }
    }, 5000);

    let isPointerLocked = false;

    window.addEventListener("click", () => {
      if (!isPointerLocked && playerId) {
        document.body.requestPointerLock();
      }
    });

    document.addEventListener("pointerlockchange", () => {
      isPointerLocked = document.pointerLockElement === document.body;
    });

    let x = 0,
      y = 0;
    window.addEventListener("mousemove", (evt) => {
      if (isPointerLocked) {
        x += evt.movementX;
        y += evt.movementY;
      }
    });

    const animation = () => {
      if (x !== pos.x || y !== pos.y) setPos({ x, y });

      window.requestAnimationFrame(animation);
    };

    window.requestAnimationFrame(animation);
  }, [playerId]);

  return (
    <>
      {playerId ? (
        <>
          <div className="crosshair" />
          <PlayerList players={props.game.players} />
          <Transition
            native
            items={props.game.targets}
            from={{ scale: 0 }}
            enter={{ scale: 1 }}
            leave={{ scale: 0 }}
          >
            {({ scale }, target) => {
              return (
                <AnimatedTarget
                  scale={scale}
                  onClick={(_id) =>
                    Meteor.call("game.targetHit", props.game._id, _id, playerId)
                  }
                  key={target._id}
                  _id={target._id}
                  color={target.color}
                  x={target.x - pos.x}
                  y={target.y - pos.y}
                  size={target.size}
                />
              );
            }}
          </Transition>
        </>
      ) : (
        <PlayerNameForm
          onSubmit={(name) =>
            Meteor.call(
              "game.addPlayer",
              props.game._id,
              name,
              (err, playerId) => setPlayerId(playerId),
            )
          }
        />
      )}
    </>
  );
};

export const AppWithTracker = withTracker(({ gameId }) => {
  const game = GameCollection.findOne({ _id: gameId }) || { targets: [] };
  return { game };
})(App);
