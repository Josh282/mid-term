const axios = require('axios');
const mongose = require('mongoose');
const Video = require('../src/models/videoModel');

require('dotenv').config();

const saveVideoIds = async (searchQuery) => {
    try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: process.env.YOUTUBE_API_KEY,
                    q: searchQuery,
                    part: 'id, snippet',
                    maxResults: 5,
                    type: 'video',
                },
            });

            const videoData = response.data.items.map((item) => {
                return {
                    youtubeId: item.id.videoId,
                    thumbnailsURL: item.snippet.thumbnails.high.url,
                    titleVideos: item.snippet.title,
                };
            });

            await Video.create(videoData);
            console.log(`Video data for category '${searchQuery}' saved succeessfully.`);
        } catch (error) {
            console.error('Error saving video data:', error.message);
        };
    }

    module.exports = saveVideoIds;
