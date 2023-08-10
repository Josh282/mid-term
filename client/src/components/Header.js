import React from 'react';
import { Input, Avatar } from 'antd';

const Header = () => {
    return(
        <header className='header'>
            <Avatar size='large' scr='url_to_profile_picture' />
            <Input.Search placeholder='Search' />
        </header>
    );
};

export default Header;