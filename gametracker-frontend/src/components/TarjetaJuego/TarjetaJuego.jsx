import React from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarJuego, actualizarJuego } from '../../services/juegoServices.js';
import './TarjetaJuego.css'; // El CSS pixel

// Las props de colorIndex y onJuegoActualizado ya no se usan
const TarjetaJuego = ({ juego, onRefresh }) => { 
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
                onRefresh(); 
            } catch (error) {
                console.error("Error al eliminar el juego", error);
            }
        }
    };

    const handleToggleCompletado = async () => {
        try {
            const datosUpdate = { completado: !juego.completado };
            await actualizarJuego(juego._id, datosUpdate);
            onRefresh(); 
        } catch (error) {
            console.error("Error al actualizar estado 'completado'", error);
        }
    };


    return (
        // El fondo ahora es fijo y se define en el CSS
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

            <div className="tarjeta-juego-acciones-pequenas">
                <button onClick={handleEditar} className="btn-editar">✏️ Editar</button>
                <button onClick={handleEliminar} className="btn-eliminar">🗑️ Eliminar</button>
            </div>
            
            <button onClick={handleVerResenas} className="btn-resenas-grande">⭐ Reseñas</button>
        </div>
    );
};

export default TarjetaJuego;