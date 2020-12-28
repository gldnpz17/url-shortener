var express = require('express');
var router = express.Router();

var config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(config.mongoDbUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
const Models = require('../models/models');

router.get('/:shortName', async (req, res) => {
  var result = await Models.ShortenedUrl.findOne({ shortName: req.params.shortName }).exec();

  if (result === null) {
    res.status(404).send('Short url not found.');
  }
  
  res.redirect(result.longUrl);
});

module.exports = router;