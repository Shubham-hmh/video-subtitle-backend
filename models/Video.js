// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  // Add more fields as needed
  subtitles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtitle' }],

});

module.exports = mongoose.model('Video', videoSchema);
