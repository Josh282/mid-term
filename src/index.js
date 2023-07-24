const express = require('express');
const mongoose = require('mongoose');
const videosRouter = require('./routes/videos');

// Load environment variables form .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;



app.use('/videos', videosRouter);

app.get('/', (req, res) => {
   res.send('Server is Running!');
});


app.listen(port, ()=> {
    console.log(`Server is running in http://localhost:${port}`);
});