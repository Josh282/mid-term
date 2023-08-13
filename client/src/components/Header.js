import React from 'react';
import { Input, Avatar } from 'antd';
import { useSearchContext } from './SearchContext';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const {searchValue, setSearchValue } = useSearchContext();

    const handleSearch = (value) => {
        if (value.trim() === '') {
            return;
        }

        history.push('/search');
    };

    return(
        <header className='header'>
            <Avatar size='large' scr='url_to_profile_picture' />
            <Input.Search 
                placeholder='Search' 
                value={searchValue}
                onChange= {(e) => setSearchValue(e.target.value)}
                onSearch={ (searchValue) => handleSearch(searchValue) }
            />
        </header>
    );
};

export default Header;