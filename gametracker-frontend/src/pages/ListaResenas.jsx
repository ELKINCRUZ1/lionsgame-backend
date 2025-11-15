import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getResenasPorJuego, eliminarResena } from '../services/resenaService.js'; 
// ¡Importamos el CSS!
import './ListaResenas.css'; 

const ListaResenas = () => {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { juegoId } = useParams(); 
    const navigate = useNavigate();

    const cargarResenas = useCallback(async () => {
        if (!juegoId) return;
        setLoading(true);
        try {
           
            const response = await getResenasPorJuego(juegoId);
            
           
            setResenas(response.data); 
            
            setLoading(false);
        } catch (err) {
            setError('Error al cargar las reseñas.');
            setLoading(false);
        }
    }, [juegoId]);

    useEffect(() => {
        cargarResenas();
    }, [cargarResenas]);

    // Eliminar una reseña
    const handleEliminar = async (resenaId) => {
        try {
            await eliminarResena(resenaId);
            setResenas(resenas.filter(r => r._id !== resenaId));
        } catch (err) {
            setError('Error al eliminar la reseña.');
        }
    };

    if (loading) return <div><p>Cargando reseñas...</p></div>;
    if (error) return <div><p>Error: {error}</p></div>;

    return (
        
        <div className="lista-resenas-container">
            <h1>⭐ Reseñas del Juego ⭐</h1>
            
            <div className="resenas-botones">
                <Link to={`/agregar-resena/${juegoId}`}>
                    {}
                    <button>➕ Escribir Nueva Reseña</button>
                </Link>
                
                <button onClick={() => navigate('/videojuegos')} className="btn-cancelar">
                    Volver a la Biblioteca
                </button>
            </div>

            <div className="resenas-grid">
                {resenas.length === 0 ? (
                    <p>No hay reseñas para este juego. ¡Sé el primero!</p>
                ) : (
                   
                    resenas.map(resena => (
                        <div key={resena._id} className="resena-card">
                            <h4>Puntuación: {resena.puntuacion} ⭐</h4>
                            <p className="resena-texto">"{resena.textoReseña}"</p>
                            <small>Horas Jugadas: {resena.horasJugadas || 0}</small>
                            <br />
                            <button onClick={() => handleEliminar(resena._id)} className="btn-eliminar">
                                🗑️ Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListaResenas;