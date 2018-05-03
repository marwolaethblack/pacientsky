import React from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
    <header className="header">
        <span className="brand">PatientSky</span>
        <nav>
            <ul>
                <li><Link to="/">Patients</Link></li>
                <li><Link to="/medicine">Medicine</Link></li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;