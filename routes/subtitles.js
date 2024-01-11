// routes/subtitles.js
const express = require('express');
const router = express.Router();
const Subtitle = require('../models/Subtitle');

// Endpoint to get subtitles for a video (assuming videoId is passed in the request params)
router.get('/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const subtitles = await Subtitle.find({ videoId });
    res.status(200).json({ subtitles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subtitles', error: error.message });
  }
});

// Endpoint to add subtitles to a video
// router.post('/add', async (req, res) => {
//   try {
//     const { videoId, text, timestamp } = req.body;

//     const newSubtitle = new Subtitle({
//       videoId,
//       text,
//       timestamp,
//     });

//     await newSubtitle.save();
//     res.status(201).json({ message: 'Subtitle added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding subtitle', error: error.message });
//   }
// });

module.exports = router;
