import React from 'react';
import { NavLink } from "react-router-dom";

const Header = (props) => {
    console.log(props);
    return (
    <header className="header">
        <span className="brand">PatientSky</span>
        <nav>
            <ul>
                <li><NavLink exact activeClassName='active-route' to="/">Patients</NavLink></li>
                <li><NavLink exact activeClassName='active-route' to="/medicine">Medicine</NavLink></li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;