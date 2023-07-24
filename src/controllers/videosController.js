const Video = require("../models/videoModel");

// Controller function
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.findAll();
        res.json(videos);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching videos',
            error: err.message
        })
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.json(video);
    } catch (error) {
        res.status(404).json({ 
            message: "Video not found",
            error: err.message
        });
    }
};
