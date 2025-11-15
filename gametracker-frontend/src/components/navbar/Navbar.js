import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                {/* --- ¡AQUÍ ESTÁ EL TEXTO LIONSGAME DE VUELTA! --- */}
                <Link to="/" className="navbar-logo-link">
                    <img 
                        src="/logo.png" 
                        alt="Logo de LionsGame" 
                        className="navbar-logo-img" 
                    />
                    <span className="navbar-logo-text">LionsGame</span> {/* <-- ¡TEXTO AQUÍ! */}
                </Link>

                {/* El menú de navegación (links en cuadritos) */}
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
                        <NavLink to="/estadisticas" className="nav-link">
                            Estadísticas
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