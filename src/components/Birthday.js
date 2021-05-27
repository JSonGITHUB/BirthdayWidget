import React from 'react';
import getKey from './utils/KeyGenerator.js';
import months from './utils/Months.js';

const Birthday = ({ user, x }) => {
    if (user) {
        const uri = 'https://birthday-api.anromsocial.com';
        const avatar = user.avatarUrl;
        const birthdayArray = user.birthday.split('-');
        const birthday = () => {
            const month = months[Number(birthdayArray[1])-1];
            const day = Number(birthdayArray[2]);
            return `${month} ${day}`
        }
        return (
            <div className='userInfo'>
                <img key={getKey('bDay')} src={uri + avatar} alt={user.name} className='avatar ml-20 mr-20'/>
                <div className='mt-8 leftJustify fontSize17'>
                    {user.name}
                    <div className='jobTitle'>{user.jobTitle}</div>
                    <div className='bold'>{birthday()}</div>
                </div>
            </div>
        )
    }
    return null
}
export default Birthday;