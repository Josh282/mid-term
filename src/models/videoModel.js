const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    youtubeId: {
        type: String,
        required: true,
        unique: true,
    },
    videoTitle: {
        type: String,
        required: true,
        unique: false,
    },
    videoThumbnail: {
        type: URL,
        required: true,
        unique: true,
    },
});

const Video = mongoose.model('Video', videoSchema);

module.expots = Video;