import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarJuego, actualizarJuego } from '../../services/juegoServices.js';
import './TarjetaJuego.css'; 

const TarjetaJuego = ({ juego, onJuegoEliminado, onJuegoActualizado }) => {
    const navigate = useNavigate();

    const handleEditar = () => {
        navigate(`/formulario-juego/${juego._id}`);
    };

    const handleVerResenas = () => {
        navigate(`/resenas/${juego._id}`);
    };

    const handleEliminar = async () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${juego.titulo}"?`)) {
            try {
                await eliminarJuego(juego._id);
                onJuegoEliminado(juego._id);
            } catch (error) {
                console.error("Error al eliminar el juego", error);
            }
        }
    };

    const handleToggleCompletado = async () => {
        try {
            const datosUpdate = { completado: !juego.completado };
            const juegoActualizado = await actualizarJuego(juego._id, datosUpdate);
            onJuegoActualizado(juegoActualizado);
        } catch (error) {
            console.error("Error al actualizar estado 'completado'", error);
        }
    };


    return (
        <div className="tarjeta-juego">
            
            <img 
                src={juego.imagenPortada || 'https://i.imgur.com/gSjYwL0.png'} 
                alt={`Portada de ${juego.titulo}`} 
                className="tarjeta-juego-imagen"
            />
            
            <div className="tarjeta-juego-info">
                <h3>{juego.titulo}</h3>
                <p>Plataforma: {juego.plataforma}</p>
                <p>Género: {juego.genero}</p>

                <button 
                    onClick={handleToggleCompletado}
                    className={juego.completado ? 'btn-completado' : 'btn-pendiente'}
                >
                    {juego.completado ? '✅ COMPLETADO' : '⬜ PENDIENTE'}
                </button>
            </div>

            {/* --- FILA 1: Botones Pequeños (Editar y Eliminar) --- */}
            <div className="tarjeta-juego-acciones-pequenas"> 
                <button onClick={handleEditar} className="btn-editar">✏️ Editar</button>
                <button onClick={handleEliminar} className="btn-eliminar">🗑️ Eliminar</button>
            </div>
            
            {/* --- FILA 2: Botón GRANDE (Reseñas) --- */}
            <button onClick={handleVerResenas} className="btn-resenas-grande">
                ⭐ Ver Reseñas
            </button>
            
        </div>
    );
};

export default TarjetaJuego;