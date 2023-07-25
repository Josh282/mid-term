const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema( {
    commentText: {
        type: String,
        required: true,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;