import { useState, useEffect } from 'react';
import axios from 'axios';

const useVideos = (videoId) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const url = videoId 
                    ? `${apiURL}/videos/${videoId}`
                    : `${apiURL}/videos`;
                
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