import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import ProductsContainer from './ProductsContainer';
/* import EmbedVideo from './EmbedVideo';
import CommentSection from './CommentSection'; */
import useVideos from '../hooks/useVideos';

const VideoDetailPage = () => {
    const { videoId } = useParams();
    const videos = useVideos();

    const selectedVideo  = videos.find(video => video._id === videoId);
    if (!selectedVideo) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Header />
            {/* {console.log(selectedVideo._id)} */}
            <ProductsContainer videoId={selectedVideo._id} />
        </div>
    );
};

export default VideoDetailPage;