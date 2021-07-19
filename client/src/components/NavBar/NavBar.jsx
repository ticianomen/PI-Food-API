import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png'

import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img src={Logo} className="logo" alt="Logo" />
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink to="/recipes" >All recipes</NavLink>
                        <NavLink exact to="/recipe" >Create</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}