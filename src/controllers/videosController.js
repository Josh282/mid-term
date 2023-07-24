/* const Video = require("../models/VideoModel");
 */

// Controller function
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
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
        res.json(videos);
    } catch (error) {
        res.status(404).json({ 
            message: "Video not found",
            error: err.message
        });
    }
};
