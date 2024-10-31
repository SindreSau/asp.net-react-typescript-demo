import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            {/* Header/Navbar */}
            <header>
                <nav className='navbar navbar-expand-lg'>
                    <div className='container'>
                        {/* Use NavLink instead of a for the brand too */}
                        <NavLink className='navbar-brand' to='/'>
                            Game Library
                        </NavLink>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarNav'>
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarNav'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    <NavLink
                                        to='/'
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink
                                        to='/about'
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                        About
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main content - will grow to fill available space */}
            <main className='flex-grow-1 py-4'>
                <div className='container-md'>
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className='py-4 mt-auto border-top'>
                <div className='container'>
                    <div className='text-center'>
                        <p className='mb-0'>&copy; 2024 Game Library. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
