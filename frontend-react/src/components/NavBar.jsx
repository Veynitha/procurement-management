import React from 'react';
import '../utils/Navbar.css';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="left-sidebar">
            <ul>
                <li><Link to={'/supplyOrders'} className='side-bar-link'>Purchase Orders</Link></li>
                <li><Link to={'/requests'} className='side-bar-link'>Requisitions</Link></li>
                <li><Link to={'/supplyOrders'} className='side-bar-link'>Supply Orders</Link></li>
                <li><Link to={'/supplyOrders'} className='side-bar-link'>Supplier Depots</Link></li>
                <li><Link to={'/requests'} className='side-bar-link'>Policies</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;
