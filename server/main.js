import { Meteor } from "meteor/meteor";

import { GameCollection } from "/imports/api/game.collection";
import "/imports/api/game.methods";

Meteor.startup(() => {
  //   if (GameCollection.find().count() === 0) {
  //     GameCollection.insert({
  //       lastTargetId: 4,
  //       targets: [
  //         { _id: 2, x: 300, y: 300, size: 100 },
  //         { _id: 3, x: 500, y: 300, size: 150 },
  //         { _id: 1, x: 500, y: 500, size: 200 },
  //         { _id: 4, x: 300, y: 500, size: 300 },
  //       ],
  //     });
  //   }
});
//   // If the Links collection is empty, add some data.
