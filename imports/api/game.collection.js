import { Mongo } from "meteor/mongo";

export const GameCollection = new Mongo.Collection("games");

/**
 * Each entry in the game collection
 * - _id: String
 * - targets: [
 *  {
 *      _id: String,
 *      x: Number,
 *      y: Number,
 *      size: Number
 *  }
 * ]
 */
