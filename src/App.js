import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header.js';
import Navigation from './components/Navigation.js';
import Birthdays from './components/Birthdays.js';

function App() {

    const [display, setDisplay] = useState('today');
    //console.log(`display => ${display}`)
    return (
        <div className='App'>
            <Header />
            <div className='list'>
                <Navigation setDisplay={setDisplay}/>
                <Birthdays display={display}/>
            </div>
        </div>
    );
}

export default App;
