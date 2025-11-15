import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // El CSS pixel

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                {}
                <Link to="/" className="navbar-logo-link">
                    <img 
                        src="/logo.png" 
                        alt="Logo de GameTracker" 
                        className="navbar-logo-img" 
                    />
                    {}
                </Link>

                {}
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" end>
                            Inicio
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/videojuegos" className="nav-link">
                            Videojuegos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/formulario-juego" className="nav-link">
                            Agregar juego
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/videojuegos" className="nav-link">
                            Reseñas
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/videojuegos" className="nav-link">
                            Agregar reseñas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;