import React from 'react';
import './App.css';
import { MainLayout } from './components/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
