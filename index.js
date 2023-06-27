require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("./app");

const { DB_URI, PORT } = process.env;

(async () => {
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connection succesfull");
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
})();
