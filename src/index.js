const express = require('express');
const mongoose = require('mongoose');
const scrapeVideoFromCategories = require('../seeders/saveVideoIds');
const videosRouter = require('./routes/videos');
const commentRouter = require('./routes/comment');
const Video = require('./models/videoModel');

// Load environment variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', async () => {
    console.log('Connected to MongoDB database.');
    try {
        const count = await Video.countDocuments();
        if (count === 0) {
            const categories = ['Valorant', 'Coding', 'Comedy', 'Prank'];
            for (const category of categories) {
                await scrapeVideoFromCategories(category);
            }

            console.log('Initial data population complete.');
        } else {
            console.log('Database aleady contains data. Skipping initial data population.');
        }

        // Close the mongoDB connection
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

// Routes
app.use('/videos', videosRouter);
app.use('/comments', commentRouter);


app.get('/', (req, res) => {
   res.send('Server is Running!');
});

app.listen(port, ()=> {
    console.log(`Server is running in http://localhost:${port}`);
});
