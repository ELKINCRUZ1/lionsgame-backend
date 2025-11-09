import React, { useState, useEffect } from 'react';
import FormularioResena from './FormularioResena';
import { getResenasPorJuego, eliminarResena } from '../services/apiService'; 

// Recibe el ID del juego y una función para cerrar la lista
const ListaReseñas = ({ juegoId, juegoTitulo, onClose }) => {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false); // Para agregar nueva reseña

    const cargarResenas = async () => {
        setLoading(true);
        try {
            // Llama al endpoint especial: GET /api/reseñas/juego/:juegoId
            const data = await getResenasPorJuego(juegoId); 
            setResenas(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar las reseñas.');
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarResenas();
    }, [juegoId]); // Recarga si el ID del juego cambia

    // Lógica para agregar nueva reseña (POST)
    const handleResenaGuardada = (nuevaResena) => {
        setResenas([nuevaResena, ...resenas]); // Añade la nueva reseña al inicio
        setIsFormOpen(false); // Cierra el formulario
    };

    // Lógica para eliminar reseña (DELETE)
    const handleEliminarResena = async (resenaId) => {
        if (window.confirm('¿Desea eliminar esta reseña?')) {
            try {
                await eliminarResena(resenaId);
                setResenas(resenas.filter(r => r._id !== resenaId));
            } catch (error) {
                alert('Error al eliminar la reseña.');
            }
        }
    };

    if (loading) return <div className="reseñas-modal">Cargando reseñas...</div>;
    if (error) return <div className="reseñas-modal error">{error}</div>;

    return (
        <div className="reseñas-modal">
            <h3>Reseñas de {juegoTitulo} ({resenas.length})</h3>

            <button onClick={() => setIsFormOpen(true)}>
                ➕ Escribir Reseña
            </button>
            <button onClick={onClose}>Cerrar</button>

            {isFormOpen && (
                <FormularioResena 
                    juegoId={juegoId}
                    onSave={handleResenaGuardada}
                    onClose={() => setIsFormOpen(false)}
                />
            )}

            <div className="lista-detallada-resenas">
                {resenas.length === 0 ? (
                    <p>Sé el primero en reseñar este juego.</p>
                ) : (
                    resenas.map(resena => (
                        <div key={resena._id} className="resena-item">
                            {/* Mostrar estrellas (placeholder) */}
                            <p>⭐ Puntuación: {resena.puntuacion}/5</p>
                            <p>Horas Jugadas: {resena.horasJugadas}</p>
                            <p className="texto-reseña">{resena.textoReseña}</p>
                            <button onClick={() => handleEliminarResena(resena._id)}>Eliminar</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListaReseñas;