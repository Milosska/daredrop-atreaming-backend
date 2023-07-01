const Joi = require("joi");

const genreOptions = [
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
];
const platforms = ["youtube", "tiktok", "twitch", "kick", "rumble"];

const CreateStreamerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "field 'name' is missing",
  }),
  genre: Joi.string()
    .valid(...genreOptions)
    .required()
    .messages({
      "any.required": "field 'genre' is missing",
      "any.invalid": "field 'genre' contains an invalid value",
    }),
  platform: Joi.string()
    .valid(...platforms)
    .required()
    .messages({
      "any.required": "field 'platform' is missing",
      "any.invalid": "field 'platform' contains an invalid value",
    }),
  description: Joi.string().max(1000).required().messages({
    "string.max":
      "description length must be less than or equal to 1000 characters",
    "any.required": "field 'description' is missing",
  }),
  upvote: Joi.number(),
  downvote: Joi.number(),
});

const UpdateStreamerVotesSchema = Joi.object().keys({
  upvote: CreateStreamerSchema.extract("upvote"),
  downvote: CreateStreamerSchema.extract("downvote"),
});

module.exports = {
  CreateStreamerSchema,
  UpdateStreamerVotesSchema,
};
