const Video = require("../models/videoModel");

// Controller function
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json({ videos });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching videos',
            error: error.message
        })
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json({ video });
    } catch (error) {
        res.status(404).json({ 
            message: "Video not found",
            error: error.message
        });
    }
};
