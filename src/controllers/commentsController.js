const Comment = require('../models/commentModel');

exports.getAllComments = async (req, res) => {
    const { videoId } = req.params;
    try {
        const comments = await Comment.find({ videoId: videoId}).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieved comments'
        });
    }
};

exports.postComment = async (req, res) => {
    const commentText = req.body.commentText;
    const videoId  = req.params.videoId;
    if (!commentText) {
        return res.status(400).json({
            error: 'Comment text are required'
        });
    }
    try {
        const newComment = await Comment.create({ 
            commentText: commentText, 
            videoId: videoId 
        });
        res.status(201).json(newComment);
    } catch(error) {
        res.status(500).json({
            error: 'Failed to send comment'
        });
    }
};