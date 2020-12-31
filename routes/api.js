var express = require('express');
var router = express.Router();

var config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(config.mongoDbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
const Models = require('../models/models');

//read shortened url by shortName
router.get('/url/:shortName', async (req, res) => {
  var result = await Models.ShortenedUrl.findOne({ shortName: req.params.shortName }).exec();

  if (result === null) {
    console.log('Url not found.');
  }

  res.status(200).send(JSON.stringify(result));
});

//create shortened url
router.post('/url', async (req, res) => {
  var dto = req.body;

  var result = await Models.ShortenedUrl.findOne({ shortName: dto.shortName }).exec();
  
  if (result !== null) {
    res.status(500).send(JSON.stringify({error: 'Short url already in use.'}));
  }

  var expiry = new Date(Date.now());
  expiry.setDate(expiry.getDate() + 30);

  var newUrl = new Models.ShortenedUrl({
    shortName: dto.shortName,
    longUrl: dto.longUrl,
    expiryDate: expiry
  });

  newUrl.save((err, doc) => {
    console.log(`saved: ${doc}; err: ${err}`);
  });

  res.status(200);
  res.send();
});

module.exports = router;