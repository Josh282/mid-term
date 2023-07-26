const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: [
        {
            type: String, // Or an URL to image
            default: 'default_picture.jpg' // Default picture if no thumbnails / picture given.
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

