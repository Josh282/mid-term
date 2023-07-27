const Video = require('../models/videoModel');

exports.getProductList = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findById(videoId).populate('products');

        if (!video) {
            return res.status(404).json({ message: 'Video not Found' });
        }

        const productList = video.products;

        res.status(200).json({ productList });
    } catch (error) {
        console.error('Error fetching product list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
