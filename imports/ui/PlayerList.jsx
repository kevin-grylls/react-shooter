import React from "react";
import { Transition } from "react-spring";
import _ from "lodash";

export const PlayerList = ({ players }) => {
  const orderedPlayers = _.orderBy(players, ["score"], ["desc"]);

  return (
    <div className="player-card-list">
      <Transition
        items={_.map(orderedPlayers, (player, index) => ({
          ...player,
          y: 50 * index,
        }))}
        keys={(player) => player._id}
        from={{ height: 0, opacity: 0 }}
        leave={{ height: 0, opacity: 0 }}
        enter={({ y }) => ({ y, height: 50, opacity: 1 })}
        update={({ y }) => ({ y, height: 50, opacity: 1 })}
      >
        {({ y, ...rest }, player) => {
          return (
            <div
              key={player._id}
              style={{
                color: player.color,
                transform: y.interpolate((y) => `translate3d(0,${y}px,0)`),
                ...rest,
              }}
              className="player-card"
            >
              {player.score} {player.name}
            </div>
          );
        }}
      </Transition>
    </div>
  );
};
