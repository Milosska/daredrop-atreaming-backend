const { Streamer } = require("../models/Streamer");

const streamersVoteChangeSocket = (socket) => {
  Streamer.watch()
    .on("change", (data) => {
      socket.emit("data-changed", data);
    })
    .on("error", (err) => {
      console.log(err);
    });
};

module.exports = {
  streamersVoteChangeSocket,
};
