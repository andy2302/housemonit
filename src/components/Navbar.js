import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faHome, faChartArea, faBook, faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
    const [selectedTab, setSelectedTab] = useState("/");

    return (
        <nav>
            <ul>
                <li onClick={() => setSelectedTab("/")}>
                    <NavLink to="/" className={selectedTab === "/" ? "selected" : ""}>
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>
                </li>
                <li onClick={() => setSelectedTab("/stats")}>
                    <NavLink to="/stats" className={selectedTab === "/stats" ? "selected" : ""}>
                        <FontAwesomeIcon icon={faChartArea} />
                    </NavLink>
                </li>
                <li onClick={() => setSelectedTab("/report")}>
                    <NavLink to="/report" className={selectedTab === "/report" ? "selected" : ""}>
                        <FontAwesomeIcon icon={faBook} />
                    </NavLink>
                </li>
                <li onClick={() => setSelectedTab("/settings")}>
                    <NavLink to="/settings" className={selectedTab === "/settings" ? "selected" : ""}>
                        <FontAwesomeIcon icon={faCog} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
