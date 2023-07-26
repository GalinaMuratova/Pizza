import React from 'react';
import { NavLink} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className='d-flex justify-content-around border-bottom main-nav'>
            <h1>Pizza admin</h1>
            <div>
                <NavLink className='link-nav' to='/admin/dishes'>Dishes</NavLink>
                <span> | </span>
                <NavLink className='link-nav' to='/admin/orders'> Orders</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;