import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Pagination } from 'antd';
import { useSearchContext } from './SearchContext';
import Header from './Header';
import useVideos from '../hooks/useVideos';
import VideoCard from './VideoCard';
import '../styles/searchResultPage.css';

const removePunctuation = (text) => {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
};

const SearchResultPage = () => {
    const { searchValue } = useSearchContext();
    const { videos } = useVideos();
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Prep for words input from user
    const cleanSearchValue = searchValue.trim().toLowerCase();
    const searchWords = cleanSearchValue.split(' ').map(removePunctuation);

    // Simple search Logic (search by component of words input)
    const filteredVideos = searchValue
        ? videos.filter(video => {
            const videoTitleWords = video.titleVideos.toLowerCase().split(' ').map(removePunctuation);;
            return searchWords.some(word => {  
                return videoTitleWords.includes(word);
            });
        })
        : [];

    const noVideosFound = searchValue && filteredVideos.length === 0;

    // Handle Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const videosToDisplay = filteredVideos.slice(startIndex, endIndex);

    return (
        <div className='search-result-page'>
            <Header />
            <div className='results-container'>
                <h2>Search Results for "{searchValue}"</h2>
                {noVideosFound ? (
                    <p>No videos found for "{searchValue}"</p>
                ) : (
                    <div>
                        <List  
                            itemLayout='vertical'
                            size='medium'
                            dataSource={videosToDisplay}
                            renderItem={video => (
                                <List.Item>
                                    <Link to={`/videos/${video._id}`}>
                                        <VideoCard video={video} isSearchResult />
                                    </Link>
                                </List.Item>
                            )}
                        />
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Pagination 
                                current={currentPage}
                                total={filteredVideos.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultPage;