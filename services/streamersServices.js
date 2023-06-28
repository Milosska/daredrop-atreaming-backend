const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { Streamer } = require("../models/Streamer");
const { HttpError } = require("../utils/HttpError");

const getStreamersService = async (query) => {
  const { page = 1, limit = 10, platform, genre } = query;

  const skip = (page - 1) * limit;
  const queryFilter = {};

  if (platform) {
    queryFilter.platform = platform;
  }

  if (genre) {
    queryFilter.genre = genre;
  }

  return await Streamer.find({ ...queryFilter }, "-updatedAt", {
    skip,
    limit,
  });
};

const createStreamerService = async (file, body) => {
  const { path: oldPath, filename } = file;

  const fetchedStreamer = await Streamer.findOne({ name: body.name });
  if (fetchedStreamer) {
    throw new HttpError(409, "Streamer with this name is already in the base");
  }

  const resizedImg = await Jimp.read(oldPath)
    .then((file) => {
      return file.cover(450, 600).write(oldPath);
    })
    .catch((err) => {
      console.error(err);
    });

  const newPath = `${path.join(
    process.cwd(),
    "public",
    "streamers",
    filename
  )}`;
  await fs.rename(oldPath, newPath);

  return await Streamer.create({
    ...body,
    photoURL: `${path.join("streamers", filename)}`,
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
