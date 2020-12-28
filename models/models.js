const mongoose = require('mongoose');

const shortenedUrlSchema = new mongoose.Schema({
  shortName: String,
  longUrl: String,
  expiryDate: Date
});

module.exports.ShortenedUrl = mongoose.model('ShortenedUrl', shortenedUrlSchema);