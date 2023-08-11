import { useState, useEffect } from 'react';
import axios from 'axios';

const useVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/videos')
            .then(response => {
                setVideos(response.data.videos);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }, []);
    
    return videos;
};

export default useVideos;