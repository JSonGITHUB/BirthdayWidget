import React from 'react';

const Navigation = ({ setDisplay }) => {
    return (
        <div className='m-auto App-navigation'>
            <div className='navigationTitle bold'>
                BIRTHDAYS
            </div>
            <div className='navagation'>
                <div className='flex3Column' onClick={() => setDisplay('past')}>
                    PAST<br/>
                    dates
                </div>
                <div className='flex3Column bold' onClick={() => setDisplay('today')}>
                    TODAY
                    </div>
                <div className='flex3Column' onClick={() => setDisplay('future')}>
                    UPCOMING<br/>
                    dates
                </div>
            </div>
        </div>
    )
}
export default Navigation;