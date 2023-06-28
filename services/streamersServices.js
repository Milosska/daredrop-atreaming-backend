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

const createStreamerService = async (body) => {
  const fetchedStreamer = await Streamer.findOne({ name: body.name });
  if (fetchedStreamer) {
    throw new HttpError(409, "Streamer with this name is already in the base");
  }

  return await Streamer.create({ ...body });
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
