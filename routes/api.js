var express = require('express');
var router = express.Router();

const Models = require('../models/models');

function validateLongUrl(value) {
  if (value === '' || value === null) {
    return false;
  }

  var urlRegex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
  var isValid = urlRegex.test(value);

  return isValid;
}

function validateShortName(value) {
  if (value === '' || value === null) {
    return false;
  }

  var shortNameRegex = /^[a-zA-Z0-9]([\(\)a-zA-Z0-9\.\_\-])*$/;
  var isValid = shortNameRegex.test(value);

  return isValid;
}

// Read shortened url by shortName.
router.get('/url/:shortName', async (req, res) => {
  var result = await Models.ShortenedUrl.findOne({ shortName: req.params.shortName }).exec();

  if (result === null) {
    res.status(500).send(JSON.stringify('Short URL not found.'));
  }

  if (new Date(Date.now()) > result.expiryDate) {
    await Models.ShortenedUrl.deleteOne({ id: result.id});
    res.status(500).send(JSON.stringify({error: "url expired"}));
  }

  res.status(200).send(JSON.stringify(result));
});

// Create shortened url.
router.post('/url', async (req, res) => {
  var dto = req.body;

  var result = await Models.ShortenedUrl.findOne({ shortName: dto.shortName }).exec();
  
  if (result !== null) {
    res.status(500).send(JSON.stringify({error: 'Short URL already in use.'}));
  }

  if (validateLongUrl(dto.longUrl) === false) {
    res.status(500).send(JSON.stringify({error: 'Invalid long URL.'}));
  }

  if (validateShortName(dto.shortName) === false) {
    res.status(500).send(JSON.stringify({error: 'Invalid Short URL.'}));
  }

  var expiry = new Date(Date.now());
  expiry.setDate(expiry.getDate() + 90);

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

// Check if short url has been used.
router.get('/url/check-availability/:shortName', async (req, res) => {
  var result = await Models.ShortenedUrl.findOne({shortName: req.params.shortName});

  if (result === null) {
    res.status(200).send(JSON.stringify({isAvailable: true}));
  } else {
    res.status(200).send(JSON.stringify({isAvailable: false}));
  }
});

module.exports = router;