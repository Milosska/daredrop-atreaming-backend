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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.virtual("rating").get(function () {
  const ratingRatio = this.upvote / (this.upvote + this.downvote);
  const rating = Math.round(ratingRatio * 5 * 100) / 100;
  return rating;
});

schema.post("save", handleMongooseError);

const Streamer = model("streamer", schema);

module.exports = {
  Streamer,
};
