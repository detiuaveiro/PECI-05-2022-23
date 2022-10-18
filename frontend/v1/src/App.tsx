import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Views/Components/Navbar';
import Calendar from './Views/Calendar';
import About from './Views/About';
import Home from './Views/Home';

const App: React.FC = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/about' element={<About />} />
        </Routes>
        </>
    );
}

export default App;
