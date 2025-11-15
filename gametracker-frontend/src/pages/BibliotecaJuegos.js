import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- Necesario para el modo reseña
import { getTodosLosJuegos } from '../services/juegoServices.js'; 
import TarjetaJuego from '../components/TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css'; 

const BibliotecaJuegos = () => {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroTexto, setFiltroTexto] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation(); 

    // Chequeamos si el modo reseña está activo en la URL (al hacer clic en el Navbar)
    const esModoReseña = new URLSearchParams(location.search).get('modo') === 'reseñas';


    // 1. CARGA DE DATOS
    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                setLoading(true);
                const response = await getTodosLosJuegos(); 
                setJuegos(response.data);
            } catch (err) {
                setError('Error al cargar la colección de juegos. El backend está apagado?');
            } finally {
                setLoading(false);
            }
        };
        cargarJuegos();
    }, [setLoading, setError, setJuegos]); 

    // --- LÓGICA DE FILTRADO ---
    const juegosFiltrados = juegos.filter(juego => {
        const busqueda = filtroTexto.toLowerCase();
        
        return (
            !busqueda || 
            juego.titulo.toLowerCase().includes(busqueda) ||
            juego.plataforma.toLowerCase().includes(busqueda) ||
            juego.genero.toLowerCase().includes(busqueda)
        );
    });

    // 2. FUNCIONES DE MANEJO DE ESTADO
    const handleRefresh = () => {
        window.location.reload(); 
    };

    // --- RENDERIZADO ---
    if (loading) return <div><p>Cargando colección...</p></div>;
    if (error) return <div><p>{error}</p></div>;

    // Título dinámico
    const tituloPrincipal = esModoReseña 
        ? '🔍 Selecciona el Juego a Reseñar' 
        : `🎮 Mi Colección (${juegos.length})`;

    return (
        <>
            {/* --- CONTENEDOR DE ENCABEZADO (CON EL BUSCADOR) --- */}
            <div className="biblioteca-header">
                <h1>{tituloPrincipal}</h1>
                
                {/* BARRA DE BÚSQUEDA */}
                <input
                    type="text"
                    placeholder="Buscar por título, plataforma o género..."
                    className="buscador-input"
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                />
                
                <button 
                    onClick={() => navigate('/formulario-juego')}
                    className="btn-agregar-juego" 
                >
                    + Agregar Nuevo Juego
                </button>
            </div>
            {/* ---------------------------------------------------- */}


            {/* Cuadrícula de juegos (usamos la lista FILTRADA) */}
            <div className="biblioteca-grid">
                {juegosFiltrados.length === 0 && filtroTexto ? (
                    <p className="mensaje-vacio">No se encontraron juegos que coincidan con la búsqueda.</p>
                ) : juegosFiltrados.length === 0 && juegos.length > 0 ? (
                    <p className="mensaje-vacio">No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    juegosFiltrados.map((juego, index) => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego}
                            onRefresh={handleRefresh} 
                            colorIndex={index}
                            esModoReseña={esModoReseña} // <-- PASAMOS LA PROP PARA EL BRILLO
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default BibliotecaJuegos;