import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import CardComponent from './VideoCard';
import Header from './Header';
import useVideos from '../hooks/useVideos';

const HomePage = () => {
    const { videos } = useVideos(); 
    const videosPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    // Ensuring each row has 5 videos in it
    const rows = Math.ceil(videos.length / 5);
    const rowsArray = Array.from({ length: rows }, (_, index) => index * 5);

    const totalPages = Math.ceil(videos.length / videosPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return(
        <div>
            <Header />
            {rowsArray.map((startIndex, index) => (
                <Row key={index} justify='center' gutter={[10, 10]}>
                    {videos.slice(startIndex, startIndex + 5).map(video => (
                        <Col key={video._id} span={5} xs={24} sm={12} md={8} xl={4}>
                            <Link to={`/videos/${video._id}`} key={video._id}>
                                <CardComponent video={video} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            ))}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Pagination
                        current={currentPage}
                        total={videos.length}
                        pageSize={videosPerPage}
                        onChange={handlePageChange}
                    />
                </div>
        </div>
    );
};

export default HomePage;