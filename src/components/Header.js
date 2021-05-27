import React from 'react';
import gift from '../assets/images/gift.png';

const Header = () => {
    return (
        <header className='App-header'>
            <img 
                src={gift} 
                className='App-logo mt-20' 
                alt='gift' 
            />
            <div className='redLine'></div>
        </header>
    )
}

export default Header;