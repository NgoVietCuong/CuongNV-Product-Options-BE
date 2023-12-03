const express = require('express');
const mongoose = require('mongoose');
const app = express();
const shopModel = require('./models/shop')

const { MONGO_URI, APP_PORT } = process.env;

app.get('/', async function(req, res) {
  const shop = new shopModel({
    shopDomain: 'Cuong yeu Hoa rat nhieu',
    accessToken: 'Cuong yeu minh Hoa thui',
    themeId: 100
  })

  await shop.save();
  res.send('Hello world, this is boy next door');
})

mongoose.connect(MONGO_URI, { autoIndex: true})
.then(() => {
  console.log('MongoDB database is connected');
  app.listen(APP_PORT, () => console.log(`Server started on port: ${APP_PORT}`));
})
.catch((err) => {
  console.log(err);
})