const Product = require('../src/models/productModel');
const Video = require('../src/models/videoModel');

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const getRandomProducts = (products, count) => {
    const shuffledProducts = [...products];
    shuffleArray(shuffledProducts);
    return shuffledProducts.slice(0, count); 
};

const populateVideosWithRandomProducts = async () => {
    try {
        const videos = await Video.find({});
        const products = await Product.find({});

        for (const video of videos) {
            const randomProducts = getRandomProducts(products, 4);
            video.products = randomProducts.map((product) => product._id);
            await video.save();
        }
        console.log('Succeeded in populating products within video');
    } catch (error) {
        console.error('Error populating products within video', error);
    }
};

module.exports = populateVideosWithRandomProducts;
