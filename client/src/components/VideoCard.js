import React from 'react';
import { Card as AntdCard, Tooltip} from 'antd';
import '../styles/cardComponent.css';

const CardComponent = ({ video, isSearchResult }) => {
    return (
        <Tooltip title={video.titleVideos} mouseEnterDelay={0.5}>
            <AntdCard
                className= {`custom-card ${isSearchResult ? 'search-result' : ''}`}
                bordered={false}
                type='inner'
                bodyStyle={ `${isSearchResult}` ? { display: 'flex', justifyContent: 'space-between' } : { padding: 0 } }
            >
                <img src={video.thumbnailsURL} alt={video.titleVideos} className='thumbnail' />
                <div className={`custom-card-title ${isSearchResult ? 'search-result' : ''}`}>
                    {video.titleVideos.length > 50 
                        ? `${video.titleVideos.substring(0, 40)}...`
                        : video.titleVideos}
                    </div>
            </AntdCard>
        </Tooltip>
    );
};

export default CardComponent;

