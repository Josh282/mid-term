import React from 'react';
import { Row, Col, Card as AntdCard, Tooltip} from 'antd';
import useVideos from '../hooks/useVideos';
import '../styles/cardComponent.css';

const CardComponent = () => {
    const videos = useVideos();
    /* Calculate number of rows required based on the number of videos
       arranged in 5 videos each row */
    const rows = Math.ceil(videos.length / 5);
    
    const renderRow = (startIndex, endIndex) => (
        <div>
            <Row justify='center' gutter={[10, 10]} style={{ margin:0 }}>
                {videos.slice(startIndex, endIndex).map(video => (
                    <Col span={5} key={video._id} xs={24} sm={12} md={8} xl={4}>
                        <Tooltip title={video.titleVideos} mouseEnterDelay={0.5}>
                            <AntdCard
                                className='custom-card'
                                bordered={false}
                                type='inner'
                                bodyStyle={{ padding: 0 }}
                            >
                                <img src={video.thumbnailsURL} alt={video.titleVideos} className='thumbnail' />
                                <div className='custom-card-title'>
                                    {video.titleVideos.length > 50 
                                        ? `${video.titleVideos.substring(0, 40)}...`
                                        : video.titleVideos}
                                </div>
                            </AntdCard>
                        </Tooltip>
                    </Col>
                ))}
            </Row>
        </div>
    );

    const rowsArray = Array.from({ length: rows }, (_, index) => index* 5);

    return (
        <div>
            {rowsArray.map((startIndex, index) => (
                <div key={index}>{renderRow(startIndex, startIndex + 5)}</div>
            ))}
        </div>
    );
};

export default CardComponent;

