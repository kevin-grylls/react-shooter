import { GameCollection } from "./game.collection";
import { Meteor } from "meteor/meteor";
import _ from "lodash";

if (Meteor.isServer) {
  Meteor.setInterval(() => {
    GameCollection.remove({ lastPing: { $lt: Date.now() - 10000 } });
  }, 10000);
}

const Colors = [
  "#55ff80", // green
  "#ff5558", // red
  "#5570ff", // blue
];

Meteor.methods({
  "game.create"() {
    return GameCollection.insert({
      lastPing: Date.now(),
      lastTargetId: 4,
      lastPlayerId: 0,
      targets: [
        { _id: 2, x: 300, y: 300, size: 100 },
        { _id: 3, x: 500, y: 300, size: 150 },
        { _id: 1, x: 500, y: 500, size: 200 },
        { _id: 4, x: 300, y: 500, size: 300 },
      ],
      players: [],
    });
  },

  "game.addPlayer"(gameId, playerName) {
    const game = GameCollection.findOne({ _id: gameId });

    const newPlayer = {
      _id: game.lastPlayerId + 1,
      name: playerName,
      score: 0,
      color: Colors[game.lastPlayerId % Colors.length],
    };

    game.players.push(newPlayer);
    game.lastPlayerId = newPlayer._id;

    GameCollection.update(
      { _id: gameId },
      {
        $set: game,
      },
    );

    return newPlayer._id;
  },

  "game.targetHit"(gameId, targetId, playerId) {
    const game = GameCollection.findOne({ _id: gameId });

    const targetIdex = _.findIndex(game.targets, { _id: targetId });
    const playerIndex = _.findIndex(game.players, { _id: playerId });

    if (targetIdex > -1) {
      const targetHit = game.targets[targetIdex];
      game.targets.splice(targetIdex, 1);
      const score = Math.round((1 / targetHit.size) * 10000);
      game.players[playerIndex].score += score;
    }

    if (Meteor.isServer && targetIdex > -1) {
      const newTarget = {
        _id: game.lastTargetId + 1,
        x: _.random(0, 600),
        y: _.random(0, 600),
        size: _.random(100, 500),
        color: game.players[playerIndex].color,
      };

      game.targets.push(newTarget);
      game.lastTargetId = newTarget._id;
    }

    GameCollection.update({ _id: gameId }, { $set: game });
  },

  "game.ping"(gameId) {
    if (Meteor.isServer) {
      GameCollection.update(
        { _id: gameId },
        {
          $set: { lastPing: Date.now() },
        },
      );
    }
  },
});
