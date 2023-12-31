const Comment = require('../models/commentModel');

exports.getAllComments = async (req, res) => {
    const videoId = req.params.id;
    try {
        const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });
        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieved comments'
        });
    }
};

exports.postComment = async (req, res) => {
    const userName = req.body.userName;
    const commentText = req.body.commentText;
    const videoId  = req.params.id;
    const io = req.app.get('socketio');
    
    if (!commentText) {
        return res.status(400).json({
            error: 'Comment text are required'
        });
    }
    try {
        const newComment = await Comment.create({ 
            userName: userName,
            commentText: commentText, 
            videoId: videoId 
        });

        io.emit('newComment', newComment);
        res.status(201).json(newComment);
    } catch(error) {
        res.status(500).json({
            error: 'Failed to send comment'
        });
    }
};