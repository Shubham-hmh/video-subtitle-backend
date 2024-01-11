
const mongoose = require('mongoose');

const subtitleSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  text: String,
  timestamp: Number,
});

module.exports = mongoose.model('Subtitle', subtitleSchema);
