// // routes/videos.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Video = require('../models/Video');

// // Multer setup for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// // Endpoint to handle video upload
// router.post('/upload', upload.single('video'), async (req, res) => {
//   try {
//     const { title } = req.body;
//     const filePath = req.file.path;

//     console.log(title,filePath);

//     const newVideo = new Video({
//       title,
//       filePath,
//     });

//     await newVideo.save();
//     res.status(201).json({ message: 'Video uploaded successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading video', error: error.message });
//   }
// });


// // Endpoint to fetch all videos
// router.get('/', async (req, res) => {
//   try {
//     const videos = await Video.find({}, 'title filePath'); // Fetching only 'title' and 'filePath' fields
//     res.status(200).json({ videos });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching videos', error: error.message });
//   }
// });

// module.exports = router;







const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/Video');
const Subtitle = require('../models/Subtitle');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    // Save the uploaded video
    const { title, timestamp } = req.body;
    const filePath = req.file.path;
    const newVideo = new Video({ title, filePath });
    const savedVideo = await newVideo.save();

    // Process subtitles data and save them
    let subtitles = JSON.parse(req.body.subtitles);

    console.log(subtitles);
    if (!Array.isArray(subtitles)) {
      subtitles = [subtitles]; // Ensure subtitles is an array
    }

    const subtitleObjects = subtitles.map((subtitle) => ({
      videoId: savedVideo._id,
      text: subtitle.text,
      timestamp: subtitle.timestamp,
      // Add more fields as needed
    }));

    await Subtitle.insertMany(subtitleObjects);

    res.status(201).json({ message: 'Video uploaded with subtitles successfully' });
  } catch (error) {
    console.error('Error uploading video with subtitles:', error);
    res.status(500).json({ message: 'Error uploading video with subtitles', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({}, 'title filePath'); // Fetching only 'title' and 'filePath' fields
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});


// Endpoint to fetch a specific video by its ID
router.get('/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId)
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ videoPath: video.filePath }); // Assuming 'filePath' contains the path to the video file
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
});
module.exports = router;
