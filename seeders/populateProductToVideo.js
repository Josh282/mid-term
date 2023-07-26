const Product = require('../src/models/productModel');
const Video = require('../src/models/videoModel');

const getRandomProducts = (products, count) => {
    const shuffledProducts = products.sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, count); 
}

const populateVideosWithRandomProducts = async () => {
    try {
        const videos = await Video.find({});
        const products = await Product.find({});

        videos.forEach(async (video) => {
            const randomProducts = getRandomProducts(products, 4);
            video.products = randomProducts.map((product) => product._id);
            await video.save();
        });
        console.log('Succeed in populating products within video');
    } catch (error) {
        console.error('Error populating products within video', error);
    }
}

module.exports = populateVideosWithRandomProducts

