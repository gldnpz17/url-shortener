var express = require('express');
var config = require('../config');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect(config.mongoDbUri);
const Models = require('../models/models');

//read shortened url by id
router.get('/url/:shortName', function(req, res) {
  var result = await Models.ShortenedUrl.findOne({ shortName: req.params.shortName }).exec();

  if (result === null) {
    throw new Error('short url not found.');
  }

  res.status(200).send(JSON.stringify(result));
});

//create shortened url
router.post('/url', function(req, res) {
  var dto = JSON.parse(req.body);

  var result = await Models.ShortenedUrl.findOne({ shortName: dto.shortName }).exec();
  
  if (result === null) {
    throw new Error('short url already in use.');
  }

  var expiry = new Date(Date.now());
  expiry.setDate(expiry.getDate() + 30);

  var newUrl = new Models.ShortenedUrl({
    shortName: dto.shortName,
    longUrl: dto.longUrl,
    expiryDate: expiry
  });

  newUrl.save();

  res.status(200);
  res.send();
});

module.exports = router;