const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
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
let initialPopulationComplete = false;

mongoose.connection.on('connected', async () => {
    console.log('Connected to MongoDB database.');
    try {
        const countVideos = await Video.countDocuments();
        const countProducts = await Product.countDocuments();
        if (countVideos === 0 && countProducts === 0) {
            const categories = ['Valorant', 'Coding', 'Dota2', 'Physics', 'Gadget Review', 'Minecraft', 'SUCR', 'Natgeo'];
            for (const category of categories) {
                await scrapeVideoFromCategories(category);
            };
            saveProducts();
            console.log('Initial data population complete.');
            initialPopulationComplete = true;
        } else {
            console.log('Database aleady contains data. Skipping initial data population.');
        }

    } catch (error) {
        console.error('Error populating initial data:', error.message);
        mongoose.connection.close();
    }

    if (initialPopulationComplete) {
        await populateProductsToVideo();
    }
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Middlewares
// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: process.env.FE_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 204,
}
app.use(cors(corsOptions));

// Routes
app.use('/videos', videosRouter);
app.use('/videos', commentRouter);
app.use('/videos', productRouter);

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.FE_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newComment', (comment) => {
        console.log('Received new comment:', comment);
        socket.broadcast.emit('newComment', comment);
    });
});

server.listen(port, ()=> {
    console.log(`Server is running in ${port}`);
});
