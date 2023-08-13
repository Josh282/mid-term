import { useState, useEffect } from 'react';
import axios from 'axios';

const useVideos = (videoId) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const url = videoId 
                    ? `http://localhost:5000/videos/${videoId}`
                    : 'http://localhost:5000/videos';
                
                const response = await axios.get(url); 
                setVideos(videoId ? [response.data.video] : response.data.videos);
            } catch (error) {
                setError(true);
            }
        };

        fetchVideos();
    }, [videoId]);
    
    return { videos, error };
};

export default useVideos;