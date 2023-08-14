import React from 'react';
import { Input, Avatar } from 'antd';
import { useSearchContext } from './SearchContext';
import { useHistory, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

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
            <div className='header-logo'>
                <Link to ='/'>
                    <HomeOutlined style = {{ fontSize: '45px', color: 'black', marginLeft: '20px' }} />
                </Link>
            </div>
            <Input.Search 
                placeholder='Search' 
                value={searchValue}
                onChange= {(e) => setSearchValue(e.target.value)}
                onSearch={ (searchValue) => handleSearch(searchValue) }
                style={{ width: '50%', maxWidth: '500px', margin: '0 auto' }}
            />
            <div className='header-avatar'>
                <Avatar size='large' scr='url_to_profile_picture' />
            </div>
        </header>
    );
};

export default Header;