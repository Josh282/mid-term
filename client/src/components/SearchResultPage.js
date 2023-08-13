import React from 'react';
import { List } from 'antd';
import { useSearchContext } from './SearchContext';
import Header from './Header';
import useVideos from '../hooks/useVideos';
import VideoCard from './VideoCard';
import '../styles/searchResultPage.css';

const SearchResultPage = () => {
    const { searchValue } = useSearchContext();
    const { videos } = useVideos();

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
    console.log('search:', noVideosFound);

    return (
        <div className='search-result-page'>
            <Header />
            <div className='results-container'>
                <h2>Search Results for "{searchValue}"</h2>
                {noVideosFound ? (
                    <p>No videos found for "{searchValue}"</p>
                ) : (
                    <List  
                        itemLayout='vertical'
                        size='large'
                        dataSource={filteredVideos}
                        renderItem={video => (
                            <List.Item>
                                <VideoCard video={video} isSearchRresult />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchResultPage;