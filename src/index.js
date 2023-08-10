const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scrapeVideoFromCategories = require('../seeders/saveVideoIds');
const saveProducts = require('../seeders/saveProducts');
const populateProductsToVideo = require('../seeders/populateProductToVideo');
const videosRouter = require('./routes/videos');
const commentRouter = require('./routes/comment');
const productRouter = require('./routes/product');

const Video = require('./models/videoModel');
const Product = require('./models/productModel');

// Load environment variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', async () => {
    console.log('Connected to MongoDB database.');
    try {
        const countVideos = await Video.countDocuments();
        const countProducts = await Product.countDocuments();
        if (countVideos === 0 && countProducts === 0) {
            const categories = ['Valorant', 'Coding', 'Comedy', 'Prank'];
            for (const category of categories) {
                await scrapeVideoFromCategories(category);
            };
            saveProducts();
            populateProductsToVideo();
            console.log('Initial data population complete.');
        } else {
            console.log('Database aleady contains data. Skipping initial data population.');
        }

    } catch (error) {
        console.error('Error populating initial data:', error.message);
        mongoose.connection.close();
    }
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});


// Middlewares
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((cors()));

// Routes
app.use('/videos', videosRouter);
app.use('/videos', commentRouter);
app.use('/videos', productRouter);

app.listen(port, ()=> {
    console.log(`Server is running in http://localhost:${port}`);
});
