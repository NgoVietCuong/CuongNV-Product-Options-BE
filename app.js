const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require('./routes');

const { MONGO_URI, APP_PORT } = process.env;

const app = express();
app.use(cors())
app.use(express.json());
app.use(routers);

mongoose.connect(MONGO_URI, { autoIndex: true})
.then(() => {
  console.log("MongoDB database is connected");
  app.listen(APP_PORT, () => console.log(`Server started on port: ${APP_PORT}`));
})
.catch((e) => {
  console.log("Error", e);
})