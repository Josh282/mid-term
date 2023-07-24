const express = require("express");
const router = express.Router();

// Video controller
// Video controller fetching youtube API 
const videosController = require("../controllers/videosController");


// Define the routes for videos
// Fetching all videos (thumbnail)
router.get('/', videosController.getAllVideos);

// Get video by Id
router.get('/:id', videosController.getVideoById);




module.exports = router;