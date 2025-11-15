import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Solo importamos getTodosLosJuegos (las otras funciones las usa TarjetaJuego)
import { getTodosLosJuegos } from '../services/juegoServices.js'; 
import TarjetaJuego from '../components/TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css'; // El CSS que hicimos para la cuadrícula

const BibliotecaJuegos = () => {
    // ESTADOS (El estado es lo que maneja lo que se ve en la página)
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 1. CARGA DE DATOS (Se ejecuta una sola vez al inicio)
    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                setLoading(true);
                // La API devuelve { data: [...] }
                const response = await getTodosLosJuegos(); 
                setJuegos(response.data); // <-- FIX: Extraemos el array 'data'
            } catch (err) {
                setError('Error al cargar la colección de juegos. El backend está apagado?');
            } finally {
                setLoading(false);
            }
        };
        cargarJuegos();
    }, []); // La dependencia vacía ([]) asegura que cargue solo al inicio

    // 2. FUNCIONES DE MANEJO DE ESTADO (Pasadas al componente TarjetaJuego)
    
    // Quita el juego eliminado de la lista
    const handleJuegoEliminado = (idJuegoEliminado) => {
        setJuegos(juegosActuales => 
            juegosActuales.filter(juego => juego._id !== idJuegoEliminado)
        );
    };

    // Actualiza la tarjeta cuando cambia el estado (Completado/Pendiente)
    const handleJuegoActualizado = (juegoActualizado) => {
        setJuegos(juegosActuales => 
            juegosActuales.map(juego => 
                juego._id === juegoActualizado._id ? juegoActualizado : juego
            )
        );
    };


    // --- RENDERIZADO ---
    if (loading) return <div><p>Cargando colección...</p></div>;
    if (error) return <div><p>{error}</p></div>;

    return (
        <>
            <h1>🎮 Mi Colección ({juegos.length}) 🎮</h1>
            
            {/* Botón para navegar al formulario de creación */}
            <button 
                onClick={() => navigate('/formulario-juego')}
                className="btn-agregar-juego" 
            >
                + Agregar Nuevo Juego
            </button>

            {/* Este div es el que tiene el CSS de la cuadrícula */}
            <div className="biblioteca-grid">
                {juegos.length === 0 ? (
                    <p>No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    // Mapea y dibuja las tarjetas
                    juegos.map(juego => (
                        <TarjetaJuego 
                            key={juego._id} 
                            juego={juego}
                            onJuegoEliminado={handleJuegoEliminado}
                            onJuegoActualizado={handleJuegoActualizado}
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default BibliotecaJuegos;