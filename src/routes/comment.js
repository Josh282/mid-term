const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/commentsController');


// Get all comments for corresponding video
router.get('/:videoId', commentsController.getAllComments);

// Post a new comments to corresponding video
router.post('/:videoId', commentsController.postComment);

module.exports = router;