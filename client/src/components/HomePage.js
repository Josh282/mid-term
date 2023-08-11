import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import CardComponent from './VideoCard';
import Header from './Header';
import useVideos from '../hooks/useVideos';

const HomePage = () => {
    const videos = useVideos();

    // Ensuring each row has 5 videos in it
    const rows = Math.ceil(videos.length / 5);
    const rowsArray = Array.from({ length: rows }, (_, index) => index * 5);

    return(
        <div>
            <Header />
            {rowsArray.map((startIndex, index) => (
                <Row key={index} justify='center' gutter={[10, 10]} style={{ margin:0 }}>
                    {videos.slice(startIndex, startIndex + 5).map(video => (
                        <Col key={video._id} span={5} xs={24} sm={12} md={8} xl={4}>
                            <Link to={`/videos/${video._id}`} key={video._id}>
                                <CardComponent video={video} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default HomePage;