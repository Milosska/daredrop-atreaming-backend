const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares/handleMongooseError");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "alternative",
        "challenge",
        "comedy",
        "creative",
        "educational",
        "games",
        "interview",
        "irl",
        "movies",
        "reactions",
        "tutorials",
        "webcasts",
      ],
      required: true,
    },
    platform: {
      type: String,
      enum: ["youtube", "tiktok", "twitch", "kick", "rumble"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    upvote: {
      type: Number,
      min: 0,
      default: 0,
    },
    downvote: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.post("save", handleMongooseError);

const Streamer = model("streamer", schema);

module.exports = {
  Streamer,
};
