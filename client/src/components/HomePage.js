import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import CardComponent from './VideoCard';
import Header from './Header';
import useVideos from '../hooks/useVideos';

const HomePage = () => {
    const { videos } = useVideos();
    const videosPerPage = 20;
    const videosPerRow = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the indices of the videos for the current page
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToDisplay = videos.slice(startIndex, endIndex);

    // Divide the videos into rows
    const rows = [];
    for (let i = 0; i < videosToDisplay.length; i += videosPerRow) {
        rows.push(videosToDisplay.slice(i, i + videosPerRow));
    }

    // Create the grid of videos
    const grid = rows.map((row, rowIndex) => (
        <Row key={rowIndex} justify='center' gutter={[10, 10]}>
            {row.map(video => (
                <Col key={video._id} span={5} xs={24} sm={12} md={8} xl={4}>
                    <Link to={`/videos/${video._id}`} key={video._id}>
                        <CardComponent video={video} />
                    </Link>
                </Col>
            ))}
        </Row>
    ));

    return (
        <div>
            <Header />
            {grid}
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
