const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    youtubeId: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnailsURL: String,
    titleVideos: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],

});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;