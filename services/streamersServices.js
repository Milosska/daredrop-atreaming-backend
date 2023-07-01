const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { Streamer } = require("../models/Streamer");
const { HttpError } = require("../utils/HttpError");
const { cloudinaryImgSave } = require("../utils/cloudinary/cloudinaryAPI");

const getStreamersService = async (query) => {
  const { page = 1, limit = 10, platform, genre, sort } = query;

  const skip = (page - 1) * limit;
  const queryFilter = {};

  if (platform) {
    queryFilter.platform = platform;
  }

  if (genre) {
    queryFilter.genre = genre;
  }

  let totalCount;

  try {
    const findedDocs = await Streamer.aggregate()
      .match({
        ...queryFilter,
      })
      .count("totalCount");

    totalCount = findedDocs[0].totalCount;
  } catch (err) {
    totalCount = 0;
  }

  let sortParams;

  switch (sort) {
    case "newest":
      sortParams = { createdAt: -1 };
      break;

    case "oldest":
      sortParams = { createdAt: 1 };
      break;

    case "upvote":
      sortParams = { upvote: -1 };
      break;

    case "downvote":
      sortParams = { downvote: -1 };
      break;

    default:
      sortParams = {};
  }

  const streamers = await Streamer.find(
    { ...queryFilter },
    "-createdAt -updatedAt"
  )
    .sort({ ...sortParams })
    .skip(skip)
    .limit(limit);

  return { results: streamers, totalCount };
};

const createStreamerService = async (file, body) => {
  const { path: oldPath, filename } = file;

  const fetchedStreamer = await Streamer.findOne({ name: body.name });
  if (fetchedStreamer) {
    throw new HttpError(409, "Streamer with this name is already in the base");
  }

  await Jimp.read(oldPath)
    .then((file) => {
      return file.cover(450, 600).write(oldPath);
    })
    .catch((err) => {
      console.error(err);
    });

  const fileDataPhoto = await cloudinaryImgSave(oldPath, "streamers_photo");

  return await Streamer.create({
    ...body,
    photoURL: fileDataPhoto.secure_url,
  });
};

const getStreamerByIdService = async (streamerId) => {
  const streamer = await Streamer.findById(streamerId);
  if (!streamer) {
    throw new HttpError(404, "Streamer is not found");
  }
  return streamer;
};

const updateStreamerVoteService = async (streamerId, body) => {
  const updatedStreamer = await Streamer.findByIdAndUpdate(streamerId, body, {
    new: true,
  });

  if (!updatedStreamer) {
    throw new HttpError(404, "Streamer is not found");
  }

  return updatedStreamer;
};

module.exports = {
  getStreamersService,
  createStreamerService,
  getStreamerByIdService,
  updateStreamerVoteService,
};
