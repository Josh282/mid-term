import React, { useState } from 'react';
import { List, Pagination } from 'antd';
import { useSearchContext } from './SearchContext';
import Header from './Header';
import useVideos from '../hooks/useVideos';
import VideoCard from './VideoCard';
import '../styles/searchResultPage.css';

const SearchResultPage = () => {
    const { searchValue } = useSearchContext();
    const { videos } = useVideos();
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Prep for words input from user
    const cleanSearchValue = searchValue.trim().toLowerCase();
    const searchWords = cleanSearchValue.split(' ');

    // Simple search Logic (search by component of words input)
    const filteredVideos = searchValue
        ? videos.filter(video => {
            return searchWords.some(word => {
                if (word.length < 1) {
                    return true;
                }

                const videoTitle = video.titleVideos.toLowerCase().split(' ');
    
                return videoTitle.includes(word);
            });
        })
        : [];

    const noVideosFound = searchValue && filteredVideos.length === 0;

    // Handle Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                            dataSource={filteredVideos.slice(
                                (currentPage - 1) * pageSize,
                                currentPage * pageSize
                            )}
                            renderItem={video => (
                                <List.Item>
                                    <VideoCard video={video} isSearchResult />
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