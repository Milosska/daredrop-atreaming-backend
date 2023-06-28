const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const {
  getStreamersService,
  createStreamerService,
  getStreamerByIdService,
  updateStreamerVoteService,
} = require("../services/streamersServices");

const getStreamersController = catchAsyncWrapper(async (req, res, next) => {
  const tasks = await getStreamersService(req.query);
  res.status(200).json(tasks);
});

const createStreamerController = catchAsyncWrapper(async (req, res, next) => {
  const newStreamer = await createStreamerService(req.file, req.body);
  res.status(201).json(newStreamer);
});

const getStreamerByIdController = catchAsyncWrapper(async (req, res, next) => {
  const { streamerId } = req.params;
  const streamer = await getStreamerByIdService(streamerId);
  res.status(200).json(streamer);
});

const updateStreamerVote = catchAsyncWrapper(async (req, res, next) => {
  const { streamerId } = req.params;
  const updatedStreamer = await updateStreamerVoteService(streamerId, req.body);
  res.status(200).json(updatedStreamer);
});

module.exports = {
  getStreamersController,
  createStreamerController,
  getStreamerByIdController,
  updateStreamerVote,
};
