import React from 'react'
import {NavLink} from 'react-router-dom';

const navBar = props =>{
    <header>
        <div className='main-nav-log'>
            <h1>

            </h1>
            <nav className='main-nav-item'>
                <li><NavLink to="/auth">Login</NavLink></li>
                <li><NavLink to="/listing">Listings</NavLink></li>
                <li><NavLink to="/bookings">Bookings</NavLink></li>
            </nav>

        </div>
    </header>
}
