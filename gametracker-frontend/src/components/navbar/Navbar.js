import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                
                {/* El logo (LionsGame) te lleva al Inicio */}
                <Link to="/" className="navbar-logo-link">
                    <img 
                        src="/logo.png" 
                        alt="Logo de LionsGame" 
                        className="navbar-logo-img" 
                    />
                    <span className="navbar-logo-text">LionsGame</span>
                </Link>

                {/* --- MENÚ FINAL Y LÓGICO --- */}
                <ul className="nav-menu">
                    
                    {/* 1. Link a INICIO */}
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" end>
                            Inicio
                        </NavLink>
                    </li>
                    
                    {/* 2. Link a VIDEOJUEGOS (Mi Colección) */}
                    <li className="nav-item">
                        <NavLink to="/videojuegos" className="nav-link">
                            Videojuegos
                        </NavLink>
                    </li>
                    
                    {/* 3. Link a AGREGAR JUEGO (Formulario) */}
                    <li className="nav-item">
                        <NavLink to="/formulario-juego" className="nav-link">
                            Agregar juego
                        </NavLink>
                    </li>

                    {/* 4. ESTADÍSTICAS */}
                    <li className="nav-item">
                        <NavLink to="/estadisticas" className="nav-link">
                            Estadísticas
                        </NavLink>
                    </li>

                    {/* 5. RESEÑAS: LLEVA A LA BIBLIOTECA CON UN PARÁMETRO DE BÚSQUEDA */}
                    <li className="nav-item">
                        <NavLink to="/videojuegos?modo=reseñas" className="nav-link">
                            Reseñas
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/videojuegos?modo=reseñas" className="nav-link">
                            Agregar reseñas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;