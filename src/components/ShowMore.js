import React from 'react';
import chevronRight from '../assets/images/chevron-right.svg';

const ShowMore = ({ page, setPage }) => {
    return (
        <div className='fullWidth m-30' onClick={() => setPage(page+1)}>
            Show more
            <img 
                src={chevronRight} 
                className='chevron' 
                alt='chevron' 
            />
        </div>
    )
}
export default ShowMore;