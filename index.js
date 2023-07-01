require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const { app } = require("./app");

const { streamersVoteChangeSocket } = require("./sockets/streamersRenewSocket");

const { DB_URI, PORT } = process.env;

const server = http.createServer(app);
const wsServer = new Server(server, {
  cors: {
    origins: "*",
  },
});

wsServer.on("connection", (socket) => {
  streamersVoteChangeSocket(socket);
});

(async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connection succesfull");
  server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
})();
