import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from './Header';
import ProductsContainer from './ProductsContainer';
import LiveComment from './LiveComment';
import useVideos from '../hooks/useVideos';
import useYouTubePlayer from '../hooks/useYouTubePlayer';
import '../styles/videoDetailPage.css';

const VideoDetailPage = () => {
    const { videoId } = useParams();
    const history = useHistory();
    const { videos, error } = useVideos(videoId);
    const playerRef = useYouTubePlayer(videos[0]?.youtubeId);

    if (error) {
        history.push('/error');
    }
 
    return (
        <div className='main'>
            <Header />
            <div className='body-container'>
                <div className='left-container'>
                    <ProductsContainer videoId={videoId} />
                </div>
                <div className='center-container'>
                     <div ref={playerRef} className='youtube-player'/>
                     <h1>{videos[0]?.titleVideos}</h1>
                </div>
                <div className='right-container'>
                    <LiveComment />
                </div>
            </div>
        </div>
    );
};

export default VideoDetailPage;