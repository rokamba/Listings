import React from 'react'
import { NavLink } from 'react-router-dom';
import Authentication from '../../context/authentication';
import './NavBarStyle.css'

const navBar = props => (
    <Authentication.Consumer>
        {context => {
            return (
                <header className='navigation'>
                    <div className='main-nav-log'>
                        <h1>Listings</h1>
                    </div>

                    <nav className='main-nav-item'>
                        <ul>
                            {!context.token && (
                                <li><NavLink to="/auth">Login</NavLink></li>)}

                            <li><NavLink to="/listing">Listings</NavLink></li>

                            {context.token && (
                                <li><NavLink to="/bookings">Bookings</NavLink></li>)}
                        </ul>
                    </nav>


                </header>
            );

        }}

    </Authentication.Consumer>
);

export default navBar;

